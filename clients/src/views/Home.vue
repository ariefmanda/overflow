<template>
<div class="row" style="margin-top:40px">
  <!-- /.col-lg-3 -->
  <div class="col-lg-9">
    <div class="card">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Point</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question,i) in questions" :key="i">
            <th>
              <router-link :to="'/question/'+question._id" style="cursor:pointer">{{question.title}}</router-link>
            </th>
            <td>{{question.point}}</td>
          </tr>
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </div>
  </div>
  <!-- /.col-lg-9 -->
  <div class="col-lg-3">
    <div>
      <form class="form-inline" @submit.prevent="searching">
          <input class="form-control mr-sm-2" type="text" v-model="search" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" style="cursor:pointer">
          <router-link to="/category">All</router-link>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center" style="cursor:pointer" v-for="(category,i) in categories" :key="i">
          <router-link :to="'/category/'+category._id">
            {{category.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      questions: [],
      categories: [],
      questionsAbsolute: [],
      query: this.$route.query.category,
      search:''
    };
  },
  created() {
    this.start();
  },
  props: ['id'],
  methods: {
    start() {
      this.$axios.get('/question')
        .then(({
          data
        }) => {
          data = data.sort((a, b) => b.point > a.point);
          this.questions = data;
          this.questionsAbsolute = data;
          this.$axios.get('/category')
            .then(({
              data
            }) => {
              this.categories = data;
              if (this.$route.params.id) {
                this.questions = this.questionsAbsolute.filter(f => f.CategoryId === this.$route.params.id);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    searching(){
      if(this.search){
        this.questions = this.questionsAbsolute.filter(e=>{
          let s=false
          if(e.question.toLowerCase().split(' ').join('').split(this.search.toLowerCase().split(' ').join('')).length>1){
            s=true
          }
          return s
        })
        this.search=""
      }else{
        console.log(this.items);
        this.questions = this.questionsAbsolute
      }
    }
  },
  watch: {
    id(e) {
      if (e) {
        this.questions = this.questionsAbsolute.filter(f => f.CategoryId === e);
      } else {
        this.questions = this.questionsAbsolute;
      }
    },
  },
};
</script>
