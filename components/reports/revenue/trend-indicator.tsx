export function TrendIndicator({ change }: { change: string }) {
  const isPositive = change.startsWith('+');
  return (
    <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
      <span>{change}</span>
    </div>
  );
}