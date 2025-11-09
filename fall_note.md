#### 编程题
###### 判断质数

```cpp
bool isPrime(int n){
    if(n<=1){
        return false;
    }
    for(int i=2;i*i<=n;i++){
        if(n%i==0){
            return false;
        }
    }
    return true;
}
```

###### 分饼干

数字 k 有些数位变得模糊了，把 k 块饼干平分给 n 个小朋友，计算 k 有多少种可能的数值

```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    string k_str;
    long long n;
    cin>>k_str>>n;
    int len=k_str.length();
    vector<long long> dp(n,0);
    dp[0]=1;
    for(int i=0;i<len;i++){
        vector<long long> next_dp(n,0);
        char curChar=k_str[i];
        for(int rem=0;rem<n;rem++){
            if(dp[rem]==0){//说明在上一步，没有构造出任何一个余数为rem的数字
                continue;
            }
            for(int d=0;d<10;d++){
                if(curChar!='X'&&curChar-'0'!=d){
                    continue;
                }
                if(i==0&&len>1&&d==0){
                    continue;
                }
                long long new_rem=(static_cast<long long>(rem)*10+d)%n;
                next_dp[new_rem]+=dp[rem];
            }
        }
        dp=next_dp;
    }
    cout<<dp[0]<<endl;

    return 0;
}
```

###### 计算字母出现的次数

```
vector<int> counts(26,0);
string s;
for(char c :s){
    counts[c-'a']++;
}

```

###### 替换空格

```c++
int main(){
    string s;
    getline(cin,s);
    for(char &c:s){
        if(c==' '){
            c='A';
        }
    }
    cout<<s;
    return 0;
}
```

###### 比较大小的快速方法

```c++
int a,b,c;
cin>>a>>b>>c;
vector<int> nums={a,b,c};
sort(nums.begin(),nums.end());
cout<<nums[0]<<nums[1]<<nums[2];
```

###### 小数点后 1 位

```c++
cout<<fixed<<setprecision(1)<<num;
```

###### 输出给定年份区间之内的所有闰年

输出[begin, end]区间内所有的闰年。  
每个年份占 6 列（右对齐），每 5 个闰年换一行。

输出样例:

```out
  1980  1984  1988  1992  1996
  2000  2004  2008  2012  2016
  2020  2024
```

```
int begin,end;
cin>>begin>>end;
int count=0;
for(int year=begin;year<=end;year++){
    if((year%4==0)&&(year%100!==0)||(year%400==0)){
        count++;
        cout<<setw(6)<<year;
        if(count%5==0){
            cout<<endl;
        }
    }
}
return 0;
```

###### 个位数统计

```c++
vector<int> counts(10,n);
for(char c:str){
    counts[c-'0']++;
}//遍历str
for(int i=0;i<10;i++){
    if(counts[i]>0){
        cout<<i<<":"<<counts[i]<<endl;
    }
}
```
###### 孤单数序列--两数之和
```cpp
#include<bits/stdc++.h>
using namespace std;
int main(){
    int n,t;
    cin>>n>>t;
    vector<int> nums(n);
    unordered_map<int,int> idx;
    for(int i=0;i<n;i++){
        cin>>nums[i];
        idx[nums[i]]++;
    }
    for(int i=0;i<n;i++){
        int cur_num=nums[i];
        long long nxt_num=t-cur_num;
        bool is_legal=true;
        if(cur_num==nxt_num){
            if(idx[cur_num]>1){//如果当前出现的数字大于1它就不孤单
                is_legal=false;
            }
        }else{
            if(idx.count(nxt_num)){
                is_legal=false;
            }
        }
        if(is_legal){
            cout<<cur_num<<" ";
        }
    }
    return 0;
}
```


###### 友元函数之计算全班同学的平均绩点
```cpp
double averagegrade(student *stu,int count){
    double total_credits=0.0;
    double total_gpa=0.0;
    for(int i=0;i<count;i++){
        int j=0;
        while(stu[i].score[j]!=-1){
            double single_credit=stu[i].score[j];
            double single_score=stu[i].grade[j];
            double single_gpa=single_credit(single_score/10-5);
            total_credits+=single_credit;
            total_gpa+=single_gpa;
            j++;
        }
    }
    if(total_credits==0){
        return 0.0;
    }
    return total_gpa/total_credits;
}
```
###### 7-51 智能护理中心统计
```cpp
#include<bits/stdc++.h>
using namespace std;
map<string,vector<string>> children;
map<string,int> node_count;
bool isNumber(const string& s){//判断是否为数字，如果是数字，那么他就是老人的编号
    if(s.empty())return false;
    for(char c:s){
        if(!isdigit(c)){
            return false;
        }
    }
    return true;
}
int getTotal(const string& start_node){
    int total=0;
    queue<string> q;
    q.push(start_node);
    while(!q.empty()){
        string cur_node=q.front();
        q.pop();
        if(node_count.count(cur_node)){//用.count来判断键是否存在
            total+=node_count[cur_node];
        }
        if(children.count(cur_node)){//检查cur_node是否有下属
            for(const string& child_node:children[cur_node]){//如果有下属就遍历它，bfs的核心，将未访问的结点加入待处理的队列中
                q.push(child_node);
            }
        }
    }
    return total;
}
int main(){
    int n,m;
    cin>>n>>m;
    vector<string> parent(n+1);//记录每位老人所属的直接管理结点
    for(int i=0;i<m;i++){//读取m条从属关系
        string a,b;
        cin>>a>>b;
        if(isNumber(a)){//a是老人的id
            int id=stoi(a);//stoi(a)将字符串变量a转化成一个整数
            parent[id]=b;//老人的id由b直接管理
            node_count[b]++;//上级管理数加一
        }else{
            children[b].push_back(a);//说明a是一个管理结点，b是上级，将a添加到b的结点列表中
        }
    }
    char command;
    while(cin>>command&&command!='E'){
        if(command=='Q'){
            string node_name;
            cin>>node_name;
            cout<<getTotal(node_name)<<endl;
        }else if(command=='T'){
            int id;
            string new_node_name;
            cin>>id>>new_node_name;
            string old_node_name=parent[id];//获取老人所在的管理旧管理结点
            if(!old_node_name.empty()){//旧管理结点确实存在
                node_count[old_node_name]--;//把旧管理结点的统计数减一
            }
            node_count[new_node_name]++;
            parent[id]=new_node_name;
        }
    }
    return 0;
}
```



###### 7-46 胖达的山头
这道题的难点是处理输入，逻辑整体上不难,例如scanf
```cpp
#include<bits/stdc++.h>
using namespace std;
using Event=pair<int,int>;
int main(){
    int n;
    scanf("%d",&n);
    vector<Event> events;
    for(int i=0;i<n;i++){
        int h1,m1,s1,h2,m2,s2;
        scanf("%d:%d:%d %d:%d:%d",&h1,&m1,&s1,&h2,&m2,&s2);
        int startTime=3600*h1+60*m1+s1;
        int endTime=3600*h2+60*m2+s2;
        events.push_back({startTime,1});
        events.push_back({endTime+1,-1});
    }
    sort(events.begin(),events.end());
    int max_pandas=0;
    int cur_pandas=0;
    long long a=0;
    for(const auto& event:events){
        cur_pandas+=event.second;
        if(max_pandas<cur_pandas){
            max_pandas=cur_pandas;
        }
    }
    a=max_pandas;
    printf("%lld",a);

    return 0;
}
```

###### 7-47 被n整除的n位数
第一位数被1整除，第二位数被2整除，第三位数被3整除，第四位数被4整除
```cpp
int n;
long long a,b;//区间范围
bool found=false;
void findNumbers(int index,long long res){
    if(index>n){
        if(res>=a&&res<=b){
            cout<<res<<endl;
            found=true;
        }
        return;
    }
    for(int d=0;d<=9;d++){
        if(index==1&&d==0){//第一位数字不能为0
            continue;
        }
        long long next_number=res*10+d;
        if(next_number%index==0){
            findNumbers(index+1,next_number);
        }
    }
}
```
###### 7-20现代战争
```cpp
#include<bits/stdc++.h>
using namespace std;
struct Buildings{
    int value;
    int r,c;
};
bool compare(const Buildings& A,const Buildings& B){
    return A.value>B.value;
}
int main(){
    int n,m,k;
    cin>>n>>m>>k;
    vector<vector<int>> grid(n,vector<int>(m));
    vector<Buildings> buildings;
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            cin>>grid[i][j];
            buildings.push_back({grid[i][j],i,j});
        }
    }
    sort(buildings.begin(),buildings.end(),compare);
    vector<bool> r_destroyed(n,false);
    vector<bool> c_destroyed(m,false);
    int ans=0;
    for(const auto& building:buildings){
        if(ans==k){
            break;
        }
        if(r_destroyed[building.r]||c_destroyed[building.c]){
            continue;
        }
        r_destroyed[building.r]=true;
        c_destroyed[building.c]=true;
        ans++;
    }
    for(int i=0;i<n;i++){
        if(!r_destroyed[i]){
            bool first_in_row=true;
            for(int j=0;j<m;j++){
                if(!c_destroyed[j]){
                    if(!first_in_row){
                        cout<<" ";
                    }
                    cout<<grid[i][j];
                    first_in_row=false;
                }
            }
            cout<<"\n";
        }
    }
    return 0;
}
```
###### 7-19大幂数
```cpp
#include<bits/stdc++.h>
using namespace std;
long long power(long long base,long long exp,long long limit){
    long long res=1;
    for(int i=0;i<exp;i++){
        if(res*base>limit){
            return limit+1;
        }
        res*=base;
    }
    return res;
}
int main(){
    int n;
    cin>>n;
    long long final_k=0;
    long long final_m=0;
    bool found=false;
    for(int k=31;k>=1;k--){
        long long cur_sum=0;
        for(long long m=1;;m++){
            long long index=power(m,k,n);
            if(index>n){
                break;
            }
            if(index+cur_sum>n){
                break;
            }
            cur_sum+=index;
            if(cur_sum==n){
                final_k=k;
                final_m=m;
                found=true;
                break;
            }
        }
        if(found){
            break;
        }
    }
    if(found){
        cout<<"1^"<<final_k;
        for(int i=2;i<=final_m;i++){
            cout<<"+"<<i<<"^"<<final_k;
        }cout<<endl;
    }else{
        cout<<"Impossible for "<<n<<".";
    }

    return 0;
}
```
###### 7-16 字符串检测,含大小写检测
```cpp
#include<bits/stdc++.h>
using namespace std;
string toLower(const string& s){
    string lower_s=s;
    for(char& c:lower_s){
        c=tolower(c);//将c递归地转化成小写字母tolower(c);
    }
    return lower_s;
}
int main(){
    int T;
    cin>>T;
    cin.ignore();
    for(int i=0;i<T;i++){
        string line;
        getline(cin,line);
        string lower_line=toLower(line);
        if(lower_line.find("shinto mekkaku")!=string::npos){
            cout<<"Medaka Kuroiwa"<<endl;
        }else{
            cout<<"Bonjsada";
        }
    }
    return 0;
}
```



#### 类

##### 成员函数

一般是有双冒号的形式

###### Tree 类的构造函数

```cpp
Tree::Tree(){
    ages=1;
}
void Tree::grow(int years){
    ages+=years;
}
void Tree::age(){
    cout<<ages<<endl;
}
```

##### 自定义的学生类

本题要求定义一个简单的学生类。数据成员有学号和姓名，函数成员的原型见给出的代码，请给出函数成员的类外完整实现。

函数接口定义：

```c++

class Student
{
private:
    int m_id;
    char m_name[10];
public:
    Student(int id=0,char *name="");
    ~Student();
    void print();
};
```

答案：

```
Student::Student(int id,char* name){
    m_id=id;
    strcpy(m_name,name);
    cout<<"Hi"<<m_id<<" "<<m_name<<endl;
}
Student::~Student(){
    cout<<"Bye!"<<endl;
}
void Student::print(){
    cout<<"Bye!"<<endl;
}
```

解析：m_name 是一个 char 数组，不能直接用=赋值，必须使用字符串拷贝函数 strcpy 将 name 的内容复制到 m_name 中去。

##### 使用类计算矩形的面积

审题：
矩形类 Rectang 接口定义如下：

```c++
class Rectangle {
public:
    void setLength(int l);//设置矩形的长度
    void setWidth(int w); //设置矩形的宽度
    int getArea();    //计算并返回矩形的面积
private:
    int length, width;  //矩形的长度和宽度
};
```

对应代码

```
void Rectangle::setLength(int l){
    length=l;
}
void Rectangle::setWidth(int w){
    width=w;
}
int Rectangle::getArea(){
    return length*width;
}
```

##### 定义类

考点：默认构造函数
带参数的构造函数
拷贝构造函数
析构函数
友元函数

```
enum CPU_Rank {P1=1,P2,P3,P4,P5,P6,P7};
class CPU{
private:
    CPU_Rank rank;
    int frequency;
    float voltage;
}
public:
    CPU(){
        rank=p1;
        frequency=2;
        voltage=100;
        cout<<"create a CPU!"<<endl;
    }

    CPU(CPU_Rank r,int f,float v){
        rank=r;
        frequency=f;
        voltage=v;
    }

    CPU(const CPU& c){
        rank=c.rank;
        frequency=c.frequency;
        voltage=c.voltage;
        cout<<"copy create a CPU!"<<endl;
    }
    ~CPU(){
        cout<<"destruct a CPU"<<endl;
    }
```

###### 单友元函数

```
class Complex{

    friend Complex AddComplex(const Complex& x,const Complex& y);
}
Complex AddComplex(const Complex& x,const Complex& y){
    int newR=x.real+y.real;
    int newI=x.imagine+y.imagine;
    return Complex(newR,newI);
}
```

###### 双友元函数

题目要求：定义 boat 与 car 两个类，二者都有 weight 属性，定义二者的一个友元函数 totalweight()，计算二者的重量和。

```
class car;
class boat{
private:
    int weight;
public:
    boat(int w){
        weight=w;
    }
    friend int totalweight(boat b,car c);
};
class car{
private:
    int weight;
public:
    car(int w){
        weight=w;
    }
    friend int totalweight(boat b,car c);
};
int totalweight(boat b,car c){
    return b.weight+c.weight;
}
```

###### 学生成绩的输入和输出--静态的数据成员

```
class Student{
private:
    static int count;
    friend ostream& operator<<(ostream& os,const Student& st);
};
int Student::count=0;
ostream& operator<<(ostream& os,const Student& st){
    Student::count++;
    os<<Student::count<<". "<<st.name<<" ";
}

```
