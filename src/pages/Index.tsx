import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [robuxAmount, setRobuxAmount] = useState([1000]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const pricePerRobux = 13 / 15;
  const totalPrice = Math.round(robuxAmount[0] * pricePerRobux);

  const packages = [
    { amount: 400, price: 320, popular: false, discount: '' },
    { amount: 800, price: 720, popular: true, discount: '-5%' },
    { amount: 1700, price: 1300, popular: false, discount: '-10%' },
    { amount: 4500, price: 3500, popular: false, discount: '-15%' },
  ];

  const reviews = [
    {
      name: 'Александр',
      rating: 5,
      text: 'Отличный сервис! Робаксы пришли моментально, всё работает идеально.',
      avatar: '👨',
    },
    {
      name: 'Мария',
      rating: 5,
      text: 'Заказывала уже несколько раз, всегда быстро и качественно. Рекомендую!',
      avatar: '👩',
    },
    {
      name: 'Дмитрий',
      rating: 5,
      text: 'Лучшие цены на рынке. Поддержка отвечает быстро и помогает решить любые вопросы.',
      avatar: '👦',
    },
  ];

  const handleOrder = () => {
    toast({
      title: 'Заказ оформлен!',
      description: `${robuxAmount[0]} Robux на сумму ${totalPrice}₽ добавлены в корзину`,
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Сообщение отправлено!',
      description: 'Мы свяжемся с вами в ближайшее время.',
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              R
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              RobuxShop
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-gray-700 hover:text-primary transition-colors">
              Главная
            </a>
            <a href="#catalog" className="text-gray-700 hover:text-primary transition-colors">
              Каталог
            </a>
            <a href="#reviews" className="text-gray-700 hover:text-primary transition-colors">
              Отзывы
            </a>
            <a href="#contacts" className="text-gray-700 hover:text-primary transition-colors">
              Контакты
            </a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90">
            <Icon name="ShoppingCart" size={18} />
            <span className="ml-2">Корзина</span>
          </Button>
        </nav>
      </header>

      <main>
        <section id="hero" className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-secondary text-secondary-foreground border-none px-6 py-2 text-base">
              🎮 Быстрая доставка Robux
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent animate-fade-in">
              Покупай Robux выгодно
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Лучшие цены, моментальная доставка и круглосуточная поддержка
            </p>

            <Card className="max-w-2xl mx-auto shadow-2xl border-2 animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl">Выбери количество Robux</CardTitle>
                <CardDescription>Настрой количество с помощью слайдера</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-4xl font-bold text-primary">{robuxAmount[0]}</span>
                    <span className="text-3xl font-bold">{totalPrice}₽</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={12000}
                    step={5}
                    value={robuxAmount[0]}
                    onChange={(e) => setRobuxAmount([parseInt(e.target.value)])}
                    className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>15</span>
                    <span>12,000</span>
                  </div>
                </div>
                <Button
                  onClick={handleOrder}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 text-lg py-6"
                >
                  <Icon name="Zap" size={20} />
                  <span className="ml-2">Купить сейчас</span>
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8">
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                <Icon name="Zap" size={32} className="text-primary" />
                <span className="text-sm font-medium">Моментально</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                <Icon name="Shield" size={32} className="text-primary" />
                <span className="text-sm font-medium">Безопасно</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                <Icon name="HeadphonesIcon" size={32} className="text-primary" />
                <span className="text-sm font-medium">24/7 Поддержка</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/50 backdrop-blur-sm">
                <Icon name="TrendingDown" size={32} className="text-primary" />
                <span className="text-sm font-medium">Низкие цены</span>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="container mx-auto px-4 py-20 bg-white/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Популярные пакеты</h2>
              <p className="text-xl text-muted-foreground">
                Выбери готовый пакет или настрой свой выше
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg, index) => (
                <Card
                  key={index}
                  className={`relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                    pkg.popular ? 'border-primary border-2 shadow-lg' : ''
                  }`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-blue-600">
                      🔥 Популярный
                    </Badge>
                  )}
                  {pkg.discount && (
                    <Badge className="absolute -top-3 right-4 bg-secondary">
                      {pkg.discount}
                    </Badge>
                  )}
                  <CardHeader className="text-center space-y-4 pt-8">
                    <div className="w-20 h-20 mx-auto flex items-center justify-center">
                      <img 
                        src="https://cdn.poehali.dev/files/3C94630B-00CB-4CF6-B878-646C4B62EE39_4_5005_c.jpeg" 
                        alt="Robux" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <CardTitle className="text-3xl font-bold">{pkg.amount}</CardTitle>
                    <CardDescription>Robux</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <span className="text-4xl font-bold">{pkg.price}₽</span>
                    </div>
                    <Button
                      className="w-full"
                      variant={pkg.popular ? 'default' : 'outline'}
                      onClick={handleOrder}
                    >
                      Купить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Отзывы клиентов</h2>
              <p className="text-xl text-muted-foreground">
                Что говорят наши довольные покупатели
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center text-2xl">
                        {review.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="container mx-auto px-4 py-20 bg-white/30 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Связаться с нами</h2>
              <p className="text-xl text-muted-foreground">
                Есть вопросы? Мы всегда на связи
              </p>
            </div>

            <Card className="shadow-xl">
              <CardContent className="pt-6">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Имя
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите ваше имя"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Сообщение
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Расскажите, чем мы можем помочь..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                  >
                    <Icon name="Send" size={18} />
                    <span className="ml-2">Отправить сообщение</span>
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm">
                <Icon name="Mail" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">support@robuxshop.ru</p>
              </div>
              <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm">
                <Icon name="MessageCircle" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Telegram</p>
                <p className="text-sm text-muted-foreground">@robuxshop_support</p>
              </div>
              <div className="p-6 rounded-xl bg-white/50 backdrop-blur-sm">
                <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Время работы</p>
                <p className="text-sm text-muted-foreground">24/7</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                R
              </div>
              <span className="text-xl font-bold">RobuxShop</span>
            </div>
            <div className="text-center text-sm text-gray-400">
              <p>© 2024 RobuxShop. Все права защищены.</p>
              <p className="mt-2">Мы не аффилированы с Roblox Corporation</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-primary">
                <Icon name="Mail" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;