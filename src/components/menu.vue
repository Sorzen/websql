<template lang="html">
    <div style="width: 800px;margin: 100px auto 0;height: 400px;">

       <Select v-model="province" style="width:200px" @on-change="getData">
        <Option v-for="item in cityList" :value="item.province" :key="item.province">{{ item.province }}</Option>
      </Select>

      <Select v-model="city" style="width:200px">
        <Option v-for="item in cityArr" :value="item" :key="item">{{ item }}</Option>
      </Select>
    </div>
</template>

<script>
    import Database from '../assets/database/database';

    export default {
        data() {
            return {
              val: [], //存放选择的数据信息
              province: '',
              city: '',
              cityList: [
                { province: '河北', city: ['石家庄', '保定', '唐山'], },
                { province: '山东', city: ['济南','青岛','淄博'], },
                {province: '四川', city: ['成都','绵阳'], },
                { province: '天津', city: ['天津'], },
                { province: '山西', city: ['太原','大同','阳泉'] }],
              cityArr: [],
              db: new Database(),
            };
        },
        methods: {
            init() {
              this.openDataBase();
            },
          /**
           * 打开数据库
           * @returns {Promise.<void>}
           */
          openDataBase(){
            //打开数据库，没有则创建
            this.db.openDatabase('areaDatabase',1,'demo').then( (res) =>{
              //检测数据库是否存在
              this.db.isExists('area').then(res=>{
                //数据库已经存在，直接使用,
                this.db.delete('area');// 每次创建表之前先清空之前表数据
                // 将数据添加到数据表中
                this.db.insert('area', this.cityList);
              }).catch(e=>{
                //数据库不存在，请求接口并处理数据，然后存入数据库
                this.db.createTable('area', {
                  province: 'varchar(200)',
                  city: 'varchar(200)',
                });
                // 将数据添加到数据表中
                this.db.insert('area', this.cityList);
              })
            }).catch(e=>{
              console.err(e)
            })
          },
          /**
           * 获取分数据
           *
           */
          getData(val){
            console.log(val);
            // 查询数据表中数据
            this.db.select('area',{
              province: ['=', val],
            }, '*', 'province').then(res => {
              this.cityArr = res.data[0].city.split(',');
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