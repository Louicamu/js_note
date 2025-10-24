###### 判断质数

```
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

#### 类

##### 成员函数

一般是有双冒号的形式

###### Tree 类的构造函数

```
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
