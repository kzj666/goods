## 一个实现核心功能的秒杀系统
- 基于SpringBoot 2.2.6
- 采用thymeleaf模板引擎
- OOM采用MyBatisPlus框架
- 利用jsoup以及HuTool爬取聚美优品热卖网数据
- redis实现缓存，提高系统处理性能
- 利用redis的List和Set存储类型，防止商品的超卖
- RabbitMQ实现流量削峰，控制对后端数据库请求压力
- 前端实现动静态数据分离
- 其他: 任务调度方式开启秒杀活动，任务调度实现页面静态化，提高系统吞吐量
- jmeter进行压力测试
- Nginx实现反向代理以及静态资源的缓存和压缩


