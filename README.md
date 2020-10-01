# PCR Clan-Battle-Analyzer 工会战数据分析工具

使用开发交流QQ群：931482960

仓库地址：[https://github.com/Alive24/pcr-clan-battle-analyzer-vue]

## 简介
目前yobot等会战机器人都会提供一些基础的数据统计，但并没有统计提供了“标准化”(Z-Score/偏差值)的统计。原本想直接在已有的插件上修改，但我不会jinja。于是现学了Vue做了一个这样的工具快速计算出偏差值。

### Z-Score/偏差值说明
Z-Score/偏差值在统计学上是“标准化”的结果，具体的做法是将每一条数据与其平均值相减后除以其标准差。具体数字的大小可以诠释为”这个数据比起平均值差了多少个标准差“
在工会战中，这个数据可以排除不同Boss平均值不同、分布情况不同，以及是否尾刀/补偿刀带来的影响，通过用一个标准的方式只和同样打了这个boss的会内其他成员比较来更加准确地反映出该成员出刀的水平，并且获取一个有参照意义的整体数据。

### 数据预处理流程
本工具在数据预处理环节只保留同时满足以下所有条件的数据：
1. 不属于一周目(即只保留B面)
2. 不属于尾刀或者补偿刀
3. Z-Score/偏差值不高于+6或-6(即去除离谱数据)

### 数据计算流程
1. 为每个Boss相关的出刀数据分别计算了其平均值，并为每一条数据计算了偏差值。
2. 为每个工会成员计算了总体的平均偏差值和每个Boss的平均偏差值

## 使用方法
- GitHub Pages地址：[https://alive24.github.io/pcr-clan-battle-analyzer-vue/]
- Vercel地址(国内连接更快)：[https://pcr-clan-battle-analyzer-vue.vercel.app/]

1. 在会战机器人内找到api地址后填入。
- 备注：如果你的会战机器人不是使用的https协议(比如说是直接使用的ip地址)，则需要进行以下两个操作，才能混合使用http不安全内容
2. 点击地址右边的下载按钮后，即可获得分析结果
3. 在有效出刀记录标签卡中可以看到每一次参与统计的出刀详情和公会各Boss的平均值
4. 在”按成员统计“标签卡中可以看到每个成员每个boss以及总体的偏差值详情
