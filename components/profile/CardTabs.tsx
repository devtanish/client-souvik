import { TrendingUp, TrendingDown } from 'lucide-react';

export const MetricCard = ({ title, value, trend, type = 'number', description, lastUpdate, onClick, isActive }: { title: string; value: number; trend: number; type?: 'number' | 'money'; description: string; lastUpdate: string; onClick?: () => void; isActive?: boolean }) => {
  const isPositive = trend >= 0;
  const trendIcon = isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  
  const formatValue = (val: number, type: 'number' | 'money') => {
    if (type === 'money') {
      return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return val.toLocaleString('en-US');
  };

  return (
    <div 
      onClick={onClick}
      className={`min-w-[280px] bg-white rounded-2xl p-6 border-2 shadow-sm flex-shrink-0 cursor-pointer transition-all hover:shadow-md ${
        isActive ? 'border-gray-900' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {trendIcon}
          <span>{isPositive ? '+' : ''}{trend}%</span>
        </div>
      </div>
      
      <div className="text-4xl font-serif text-gray-900 mb-3">
        {formatValue(value, type)}
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-gray-900 text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>{description}</span>
        </div>
        <p className="text-gray-500 text-xs">{lastUpdate}</p>
      </div>
    </div>
  );
};
