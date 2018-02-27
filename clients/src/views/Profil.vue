<template>
  <div>
      <div class="jumbotron">
        <center><img class="d-flex mr-3 rounded-circle" :src="questions[0].UserId.image_url||''" alt=""></center>
        <p class="lead">{{questions[0].UserId.name||''}}</p>
        <hr class="my-4">
        <p>{{questions[0].UserId.email||''}}</p>
    </div>
    <div class="card">
      <center><h3>List Your Questions</h3></center>
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
            <td>{{question.point.length||0}}</td>
          </tr>
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    computed:{
        token() {
            return this.$store.state.token;
        },
        UserId() {
            return this.$store.state.UserId;
        },
        questions(){
            return this.$store.state.questions.filter(e=>{
                console.log(e);
                return e.UserId._id == this.UserId
            })
        }
    },
    created() {
        this.$store.dispatch('getQuestions')
        this.start()
    }
}
</script>

<style>

</style>
