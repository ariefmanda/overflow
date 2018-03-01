<template>
<div class="container" style="margin-top:40px">
  <div class="row">
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
            <td>{{question.point.length}}</td>
          </tr>
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </div>
  </div>
  <div class="col-lg-3">
    <div>
      <form class="form-inline" @submit.prevent="searching">
          <input class="form-control mr-sm-2" type="text" v-model="search" placeholder="Search">
          <button class="btn btn-secondary my-sm-0" type="submit">Search</button>
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
</div>
</template>

<script>
import { mapState , mapActions } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      questions: [],
      categories: [],
      questionsAbsolute: [],
      query: this.$route.query.category,
      search:''
    }
  },
  created() {
    this.start();
    this.$store.dispatch('getQuestions')
    this.$store.dispatch('getCategories')
  },
  props: ['id'],
  methods: {
    start() {
      this.$axios.get('/question')
        .then(({
          data
        }) => {
          data = data.sort((a, b) => {
            return (b.point.length||0) > (a.point.length||0)
          });
          this.questions = data;
          this.questionsAbsolute = data;
          this.$axios.get('/category')
            .then(({
              data
            }) => {
              this.categories = data;
              if (this.$route.params.id) {
                this.questions = this.questionsAbsolute.filter(f =>{ 
                  return f.CategoryId._id === this.$route.params.id
                })
              }
            })
            .catch((err) => {
              this.$notify({
                type: 'error',
                text: err.message,
              });
            });
        })
        .catch((err) => {
          this.$notify({
            type: 'error',
            text: err.message,
          });
        });
    },
    searching(){
      if(this.search){
        this.questions = this.questionsAbsolute.filter(e=>{
          let s=false
          if(e.title.toLowerCase().split(' ').join('').split(this.search.toLowerCase().split(' ').join('')).length>1){
            s=true
          }
          return s
        })
        this.search=""
      }else{
        this.questions = this.questionsAbsolute
      }
    }
  },
  watch: {
    id(e) {
      if (e) {
        this.questions = this.questionsAbsolute.filter(f => {
          return f.CategoryId._id === e
        })
      } else {
        this.questions = this.questionsAbsolute
      }
    },
  },
};
</script>
