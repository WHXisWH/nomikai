import React, { useState, useEffect } from 'react';
import { Users, MapPin, MessageCircle, Calendar, Wine, Search, Plus, Heart, Star, Clock, Map, User, Home, Settings } from 'lucide-react';

const TokyoSocialApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedIzakaya, setSelectedIzakaya] = useState(null);
  const [showReservation, setShowReservation] = useState(false);
  const [currentUser] = useState({
    id: 1,
    name: '田中太郎',
    age: 25,
    occupation: 'IT エンジニア',
    avatar: '👨‍💻',
    interests: ['お酒', 'ゲーム', '映画']
  });

  const mockUsers = [
    { id: 2, name: '佐藤花子', age: 24, occupation: 'デザイナー', avatar: '👩‍🎨', distance: '200m', interests: ['アート', 'カフェ', '音楽'], status: 'オンライン' },
    { id: 3, name: '山田一郎', age: 26, occupation: 'マーケター', avatar: '👨‍💼', distance: '450m', interests: ['グルメ', 'お酒', 'スポーツ'], status: '飲み会中' },
    { id: 4, name: '鈴木美咲', age: 23, occupation: '営業', avatar: '👩‍💼', distance: '600m', interests: ['旅行', 'グルメ', 'ショッピング'], status: 'オンライン' },
    { id: 5, name: '高橋健太', age: 27, occupation: 'エンジニア', avatar: '👨‍🔧', distance: '800m', interests: ['技術', 'お酒', 'ゲーム'], status: 'オフライン' },
    { id: 6, name: '伊藤さくら', age: 25, occupation: 'デザイナー', avatar: '👩‍🎨', distance: '1.2km', interests: ['アート', 'お酒', '映画'], status: 'オンライン' }
  ];

  const mockIzakayas = [
    { 
      id: 1, 
      name: '鳥貴族 新宿店', 
      rating: 4.2, 
      price: '¥2,000-3,000', 
      distance: '300m', 
      cuisine: '焼き鳥',
      availableSeats: 12,
      image: '🍗',
      address: '東京都新宿区新宿3-1-1'
    },
    { 
      id: 2, 
      name: '磯丸水産 渋谷店', 
      rating: 4.0, 
      price: '¥2,500-4,000', 
      distance: '500m', 
      cuisine: '海鮮',
      availableSeats: 8,
      image: '🦐',
      address: '東京都渋谷区渋谷2-2-2'
    },
    { 
      id: 3, 
      name: 'とりあえず吾平', 
      rating: 4.3, 
      price: '¥2,000-3,500', 
      distance: '750m', 
      cuisine: '居酒屋',
      availableSeats: 15,
      image: '🍻',
      address: '東京都新宿区歌舞伎町1-1-1'
    }
  ];

  const mockEvents = [
    { id: 1, title: '新宿で飲み会！', creator: '佐藤花子', time: '19:00', participants: 4, maxParticipants: 8, location: '鳥貴族 新宿店' },
    { id: 2, title: 'IT勉強会アフター', creator: '高橋健太', time: '20:30', participants: 6, maxParticipants: 10, location: 'とりあえず吾平' },
    { id: 3, title: '金曜日の乾杯会', creator: '山田一郎', time: '18:30', participants: 3, maxParticipants: 6, location: '磯丸水産' }
  ];

  const Navigation = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {[
          { id: 'home', icon: Home, label: 'ホーム' },
          { id: 'map', icon: Map, label: '地図' },
          { id: 'chat', icon: MessageCircle, label: 'チャット' },
          { id: 'events', icon: Calendar, label: 'イベント' },
          { id: 'profile', icon: User, label: 'プロフィール' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentPage(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              currentPage === id 
                ? 'text-pink-600 bg-pink-50' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  const UserCard = ({ user, onClick }) => (
    <div 
      onClick={() => onClick(user)}
      className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex items-center space-x-3">
        <div className="text-3xl">{user.avatar}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.occupation} • {user.age}歳</p>
          <p className="text-xs text-pink-600">{user.distance}</p>
        </div>
        <div className={`w-3 h-3 rounded-full ${
          user.status === 'オンライン' ? 'bg-green-400' : 
          user.status === '飲み会中' ? 'bg-yellow-400' : 'bg-gray-300'
        }`}></div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {user.interests.map((interest, idx) => (
          <span key={idx} className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
            {interest}
          </span>
        ))}
      </div>
    </div>
  );

  const IzakayaCard = ({ izakaya, onClick }) => (
    <div 
      onClick={() => onClick(izakaya)}
      className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
    >
      <div className="flex items-start space-x-3">
        <div className="text-3xl">{izakaya.image}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{izakaya.name}</h3>
          <p className="text-sm text-gray-600">{izakaya.cuisine}</p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm ml-1">{izakaya.rating}</span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600">{izakaya.price}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-pink-600">{izakaya.distance}</span>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <Users className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">{izakaya.availableSeats}席空き</span>
          </div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="pb-20">
      <header className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">こんばんは！</h1>
            <p className="text-pink-100">今夜は誰と飲みましょうか？</p>
          </div>
          <div className="text-3xl">{currentUser.avatar}</div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">附近的人</h2>
            <button className="text-pink-600 text-sm">もっと見る</button>
          </div>
          <div className="space-y-3">
            {mockUsers.slice(0, 3).map(user => (
              <UserCard key={user.id} user={user} onClick={setSelectedUser} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">おすすめ居酒屋</h2>
            <button className="text-pink-600 text-sm">もっと見る</button>
          </div>
          <div className="space-y-3">
            {mockIzakayas.slice(0, 2).map(izakaya => (
              <IzakayaCard key={izakaya.id} izakaya={izakaya} onClick={setSelectedIzakaya} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">今夜のイベント</h2>
            <button 
              onClick={() => setCurrentPage('events')}
              className="text-pink-600 text-sm"
            >
              すべて見る
            </button>
          </div>
          <div className="space-y-3">
            {mockEvents.slice(0, 2).map(event => (
              <div key={event.id} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">主催: {event.creator}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-pink-600">
                      {event.participants}/{event.maxParticipants}人
                    </div>
                    <button className="mt-2 px-3 py-1 bg-pink-600 text-white text-xs rounded-full hover:bg-pink-700 transition-colors">
                      参加
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const TokyoHeatMap = () => {
    const tokyoAreas = [
      { name: '新宿', x: 45, y: 35, intensity: 0.9, users: 45 },
      { name: '渋谷', x: 40, y: 45, intensity: 0.85, users: 38 },
      { name: '池袋', x: 55, y: 25, intensity: 0.7, users: 29 },
      { name: '銀座', x: 65, y: 55, intensity: 0.6, users: 22 },
      { name: '原宿', x: 35, y: 40, intensity: 0.75, users: 31 },
      { name: '秋葉原', x: 70, y: 45, intensity: 0.65, users: 25 },
      { name: '上野', x: 75, y: 35, intensity: 0.5, users: 18 },
      { name: '六本木', x: 50, y: 60, intensity: 0.8, users: 34 },
      { name: '品川', x: 55, y: 75, intensity: 0.45, users: 16 },
      { name: '吉祥寺', x: 20, y: 50, intensity: 0.55, users: 20 }
    ];

    const getHeatColor = (intensity) => {
      if (intensity > 0.8) return 'bg-red-500';
      if (intensity > 0.6) return 'bg-orange-500';
      if (intensity > 0.4) return 'bg-yellow-500';
      return 'bg-blue-400';
    };

    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 mb-6 relative overflow-hidden" style={{height: '300px'}}>
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M20,20 Q30,15 40,25 Q50,10 65,20 Q80,15 90,30 L85,50 Q75,60 65,55 Q50,65 40,50 Q25,55 15,40 Z" 
                  fill="#4A90E2" stroke="#2171B5" strokeWidth="0.5"/>
            <circle cx="30" cy="30" r="1" fill="#10B981"/>
            <circle cx="50" cy="40" r="1.5" fill="#EF4444"/>
            <circle cx="70" cy="35" r="1" fill="#F59E0B"/>
          </svg>
        </div>

        <div className="text-center mb-4 relative z-10">
          <h3 className="font-semibold text-gray-800">東京ユーザー分布マップ</h3>
          <p className="text-sm text-gray-600">リアルタイムアクティブユーザー</p>
        </div>

        <div className="relative z-10" style={{height: '180px'}}>
          {tokyoAreas.map((area, index) => (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${area.x}%`,
                top: `${area.y}%`,
              }}
            >
              <div 
                className={`w-8 h-8 rounded-full ${getHeatColor(area.intensity)} opacity-70 animate-pulse group-hover:scale-125 transition-all duration-300`}
                style={{
                  boxShadow: `0 0 20px rgba(255, 255, 255, ${area.intensity})`,
                }}
              />
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="font-semibold">{area.name}</div>
                <div>{area.users}人オンライン</div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-0 right-0 bg-white bg-opacity-90 rounded-lg p-2 text-xs">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>低</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>中</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>高</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>超高</span>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-0 bg-white bg-opacity-90 rounded-lg p-2">
            <div className="text-xs text-gray-700">
              <div className="font-semibold">🏢 東京23区</div>
              <div>ユーザー密度マップ</div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center relative z-10">
          <div>
            <div className="text-2xl font-bold text-pink-600">283</div>
            <div className="text-xs text-gray-600">現在オンライン</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">47</div>
            <div className="text-xs text-gray-600">飲み会中</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-xs text-gray-600">総登録者</div>
          </div>
        </div>
      </div>
    );
  };

  const MapPage = () => (
    <div className="pb-20">
      <header className="bg-gradient-to-r from-blue-500 to-teal-600 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold">東京エリアマップ</h1>
        <p className="text-blue-100">附近のユーザーと居酒屋を確認</p>
      </header>

      <div className="p-4">
        <TokyoHeatMap />

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">附近の居酒屋</h2>
          <div className="space-y-3">
            {mockIzakayas.map(izakaya => (
              <IzakayaCard key={izakaya.id} izakaya={izakaya} onClick={setSelectedIzakaya} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const ChatPage = () => {
    const [messages] = useState([
      { id: 1, sender: '佐藤花子', message: '今夜飲みに行きませんか？', time: '19:30', avatar: '👩‍🎨' },
      { id: 2, sender: '山田一郎', message: '新宿の居酒屋で待ってます！', time: '19:25', avatar: '👨‍💼' },
      { id: 3, sender: '鈴木美咲', message: 'ありがとうございました！', time: '19:20', avatar: '👩‍💼' }
    ]);

    return (
      <div className="pb-20">
        <header className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-b-3xl">
          <h1 className="text-2xl font-bold">チャット</h1>
          <p className="text-purple-100">友達とつながろう</p>
        </header>

        <div className="p-4">
          <div className="space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{msg.avatar}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900">{msg.sender}</h3>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const EventsPage = () => (
    <div className="pb-20">
      <header className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">イベント</h1>
            <p className="text-orange-100">今夜の飲み会を探そう</p>
          </div>
          <button className="bg-white bg-opacity-20 p-2 rounded-xl">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="p-4">
        <div className="space-y-4">
          {mockEvents.map(event => (
            <div key={event.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-gray-600">主催: {event.creator}</p>
                </div>
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                  参加する
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-pink-600 mr-2" />
                  <span className="text-sm text-gray-700">
                    {event.participants}/{event.maxParticipants}人参加
                  </span>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                    style={{width: `${(event.participants / event.maxParticipants) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="pb-20">
      <header className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-b-3xl">
        <div className="text-center">
          <div className="text-6xl mb-2">{currentUser.avatar}</div>
          <h1 className="text-2xl font-bold">{currentUser.name}</h1>
          <p className="text-green-100">{currentUser.occupation} • {currentUser.age}歳</p>
        </div>
      </header>

      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">興味・趣味</h3>
          <div className="flex flex-wrap gap-2">
            {currentUser.interests.map((interest, idx) => (
              <span key={idx} className="px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-900">プロフィール編集</span>
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="w-full bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-900">友達リスト</span>
            <Users className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="w-full bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span className="font-medium text-gray-900">設定</span>
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const UserDetailModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">{user.avatar}</div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.occupation} • {user.age}歳</p>
          <p className="text-pink-600 text-sm mt-1">{user.distance}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">興味・趣味</h3>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, idx) => (
              <span key={idx} className="px-2 py-1 bg-pink-100 text-pink-700 text-sm rounded-full">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all">
            友達追加
          </button>
          <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:shadow-lg transition-all">
            メッセージ
          </button>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-3 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );

  const IzakayaDetailModal = ({ izakaya, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">{izakaya.image}</div>
          <h2 className="text-xl font-bold text-gray-900">{izakaya.name}</h2>
          <p className="text-gray-600">{izakaya.cuisine}</p>
          <p className="text-sm text-gray-500 mt-1">{izakaya.address}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 font-semibold">{izakaya.rating}</span>
            </div>
            <p className="text-xs text-gray-600">評価</p>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600">{izakaya.availableSeats}席</div>
            <p className="text-xs text-gray-600">空き席</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">価格帯</h3>
          <p className="text-lg font-bold text-pink-600">{izakaya.price}</p>
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={() => setShowReservation(true)}
            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all"
          >
            予約する
          </button>
          <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:shadow-lg transition-all">
            詳細を見る
          </button>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-3 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );

  const ReservationModal = ({ izakaya, onClose }) => {
    const [selectedTime, setSelectedTime] = useState('');
    const [partySize, setPartySize] = useState(2);
    
    const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
          <h2 className="text-xl font-bold text-gray-900 mb-4">予約フォーム</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                人数
              </label>
              <select 
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num}名</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                希望時間
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTime === time
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">予約詳細</h3>
              <p className="text-sm text-gray-600">店舗: {izakaya?.name}</p>
              <p className="text-sm text-gray-600">人数: {partySize}名</p>
              <p className="text-sm text-gray-600">時間: {selectedTime || '未選択'}</p>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button 
              onClick={onClose}
              className="flex-1 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              キャンセル
            </button>
            <button 
              disabled={!selectedTime}
              className={`flex-1 py-3 rounded-xl transition-all ${
                selectedTime 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              予約確定
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'map': return <MapPage />;
      case 'chat': return <ChatPage />;
      case 'events': return <EventsPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      <Navigation />
      
      {selectedUser && (
        <UserDetailModal 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
      
      {selectedIzakaya && !showReservation && (
        <IzakayaDetailModal 
          izakaya={selectedIzakaya} 
          onClose={() => setSelectedIzakaya(null)} 
        />
      )}
      
      {showReservation && selectedIzakaya && (
        <ReservationModal 
          izakaya={selectedIzakaya}
          onClose={() => {
            setShowReservation(false);
            setSelectedIzakaya(null);
          }}
        />
      )}
    </div>
  );
};

export default TokyoSocialApp;
