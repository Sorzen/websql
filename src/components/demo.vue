<template lang="html">
  <div style="width:400px;height:400px;line-height:400px;font-size:20px;margin: 0 auto;">sql代码测试</div>
</template>

<script>
    import Database from '../assets/database/database';

    export default {
      methods: {
        init() {
          const db = new Database();
          db.openDatabase('testDatabase', 1, 'demo').then((res) => {
            console.log(res);
            db.delete('testTable');// 每次创建表之前先清空之前表数据
            // 创建名称为testTable数据表
            db.createTable('testTable', {
              name: 'varchar(200)',
              price: 'int(100)',
            });
            const data = [
              { name: '商品1', price: 80 },
              { name: '商品2', price: 10 },
              { name: '商品3', price: 870 },
              { name: '商品4', price: 680 },
              { name: '商品5', price: 250 },
              { name: '商品6', price: 80 },
            ];
            // 将数据添加到数据表中
            db.insert('testTable', data);
            // 查询数据表中数据
            db.select('testTable', {
              price: ['>', 100],
            }, '*', 'price desc').then(res => {
              console.log(res);
            });
            // 查询数据表中数据
            db.select('testTable', 'price < 200', '*', 'price desc').then(res => {
              console.log(res);
            });

            // 改变数据表中数据
            db.update('testTable', { price: 99 }, {
              name: '商品2',
            }).then(res => {
              db.select('testTable', { name: '商品2' }, 'price').then(res => {
                console.log(res);
              });
            });
          });
        },
      },
      mounted() {
          this.init();
      },
    };

</script>

<style lang="css">

</style>