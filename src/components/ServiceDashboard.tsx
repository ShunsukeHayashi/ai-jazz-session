import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Music, BarChart3, PieChart as PieChartIcon, Users } from 'lucide-react';

// サンプルデータ
const usageData = [
  { name: '1月', 会話数: 40, 質問数: 24 },
  { name: '2月', 会話数: 30, 質問数: 18 },
  { name: '3月', 会話数: 60, 質問数: 38 },
  { name: '4月', 会話数: 70, 質問数: 43 },
  { name: '5月', 会話数: 90, 質問数: 52 },
  { name: '6月', 会話数: 110, 質問数: 75 },
];

const categoryData = [
  { name: '予約管理', value: 35 },
  { name: '客室稼働率', value: 25 },
  { name: '顧客分析', value: 20 },
  { name: 'マーケティング', value: 15 },
  { name: 'その他', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ServiceDashboard = () => {
  const [activeTab, setActiveTab] = useState('usage');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          AIジャズセッション ダッシュボード
        </CardTitle>
        <CardDescription>
          サービス利用状況と分析データ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="usage">
              <BarChart3 className="h-4 w-4 mr-2" />
              利用状況
            </TabsTrigger>
            <TabsTrigger value="categories">
              <PieChartIcon className="h-4 w-4 mr-2" />
              カテゴリ分析
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              ユーザー分析
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-lg font-medium">月間利用状況</h3>
              <p className="text-sm text-muted-foreground">
                AIジャズセッションの月間利用状況を表示しています
              </p>
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usageData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="会話数" fill="#8884d8" />
                    <Bar dataKey="質問数" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">総会話数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">400</div>
                  <p className="text-xs text-muted-foreground">前月比 +12%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">平均応答時間</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2秒</div>
                  <p className="text-xs text-muted-foreground">前月比 -0.3秒</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">ユーザー満足度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5.0</div>
                  <p className="text-xs text-muted-foreground">前月比 +0.2</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-lg font-medium">質問カテゴリ分布</h3>
              <p className="text-sm text-muted-foreground">
                AIジャズセッションで最も多く質問されるカテゴリ
              </p>
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">カテゴリ分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categoryData.map((category, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span>{category.name}</span>
                        </div>
                        <span className="font-medium">{category.value}%</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-sm font-medium mb-2">ユーザー分析</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AIジャズセッションの利用者分析
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">利用者属性</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-background p-3">
                      <div className="text-xs text-muted-foreground">旅館・ホテル経営者</div>
                      <div className="text-lg font-bold">45%</div>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <div className="text-xs text-muted-foreground">フロントスタッフ</div>
                      <div className="text-lg font-bold">30%</div>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <div className="text-xs text-muted-foreground">マーケティング担当</div>
                      <div className="text-lg font-bold">15%</div>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <div className="text-xs text-muted-foreground">その他</div>
                      <div className="text-lg font-bold">10%</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">地域分布</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-background p-3">
                      <div className="text-xs text-muted-foreground">関東</div>
                      <div className="text-lg font-bold">35%</div>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <div className="text-xs text-muted-foreground">関西</div>
                      <div className="text-lg font-bold">25%</div>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <div className="text-xs text-muted-foreground">九州</div>
                      <div className="text-lg font-bold">20%</div>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <div className="text-xs text-muted-foreground">その他</div>
                      <div className="text-lg font-bold">20%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="w-full">詳細レポートをダウンロード</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceDashboard;
