import json
import hashlib
import os
from urllib.parse import urlencode


def handler(event: dict, context) -> dict:
    """
    API для работы с платежами через Robokassa.
    POST /payment - создание платежа
    POST /payment/callback - обработка результата оплаты
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('path', '')
    
    if method == 'POST' and '/callback' not in path:
        return create_payment(event)
    elif method == 'POST' and '/callback' in path:
        return handle_callback(event)
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }


def create_payment(event: dict) -> dict:
    """Создание платежа и генерация ссылки на оплату"""
    try:
        body_str = event.get('body', '{}')
        if not body_str or body_str == '':
            body_str = '{}'
        body = json.loads(body_str)
        amount = body.get('amount')
        robux_amount = body.get('robux_amount')
        email = body.get('email', '')
        
        if not amount or not robux_amount:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'amount and robux_amount are required'}),
                'isBase64Encoded': False
            }
        
        merchant_login = os.environ.get('ROBOKASSA_MERCHANT_LOGIN', 'demo')
        password1 = os.environ.get('ROBOKASSA_PASSWORD1', 'password1')
        
        inv_id = f"{int(os.times().elapsed * 1000)}"
        description = f"{robux_amount} Robux"
        
        signature_string = f"{merchant_login}:{amount}:{inv_id}:{password1}"
        signature = hashlib.md5(signature_string.encode()).hexdigest()
        
        params = {
            'MerchantLogin': merchant_login,
            'OutSum': amount,
            'InvId': inv_id,
            'Description': description,
            'SignatureValue': signature,
            'Email': email,
            'Shp_robux': robux_amount,
            'IsTest': '1'
        }
        
        payment_url = f"https://auth.robokassa.ru/Merchant/Index.aspx?{urlencode(params)}"
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'payment_url': payment_url,
                'inv_id': inv_id
            }),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }


def handle_callback(event: dict) -> dict:
    """Обработка callback от Robokassa после оплаты"""
    try:
        body = event.get('body', '')
        params = {}
        
        if body:
            for pair in body.split('&'):
                if '=' in pair:
                    key, value = pair.split('=', 1)
                    params[key] = value
        
        out_sum = params.get('OutSum', '')
        inv_id = params.get('InvId', '')
        signature = params.get('SignatureValue', '')
        robux_amount = params.get('Shp_robux', '')
        
        password2 = os.environ.get('ROBOKASSA_PASSWORD2', 'password2')
        merchant_login = os.environ.get('ROBOKASSA_MERCHANT_LOGIN', 'demo')
        
        expected_signature = hashlib.md5(
            f"{out_sum}:{inv_id}:{password2}:Shp_robux={robux_amount}".encode()
        ).hexdigest().upper()
        
        if signature.upper() == expected_signature:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'text/plain'},
                'body': f'OK{inv_id}',
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'text/plain'},
                'body': 'Invalid signature',
                'isBase64Encoded': False
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'text/plain'},
            'body': f'Error: {str(e)}',
            'isBase64Encoded': False
        }