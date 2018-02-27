<template>
  <div class="row" id="question">
    <div class="col-md-8">
      <h1 class="mt-4">{{question.title}}</h1>
      <p class="lead">
        by
        <a :href="'mailto:'+question.UserId.email">{{question.UserId.name}}</a>
      </p>
      <hr>
      <p>{{question.createdAt}}</p>
      <hr>
      <div class="row" style="margin-left:10px">
        <div class="col-md-2" >
          <div class="rows">
            <div class="row" v-if="token && question.UserId._id !== UserId" >
              <i class="fa fa-hand-o-up" style="font-size:15px;cursor:pointer" @click="plusQuestion(question._id)"></i>
            </div>
            <div class="row">
              <h2>{{question.point.length || 0}}</h2>
            </div>
            <div class="row" v-if="token && question.UserId._id !== UserId" >
              <i class="fa fa-hand-o-down" style="font-size:15px;cursor:pointer" @click="minusQuestion(question._id)"></i>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          {{question.question}}
          <div v-if="UserId === question.UserId._id">
            <i class="fa fa-edit" style="font-size:24px;cursor:pointer" data-toggle="modal" data-target="#update"></i>
            <i class="fa fa-trash" style="font-size:24px;cursor:pointer" @click="destroyQuestion()"></i>
          </div>
        </div>
      </div>
      <hr>
      <div class="card my-4">
        <h5 class="card-header">Your Answer:</h5>
        <div class="card-body">
          <div class="form-group">
            <textarea class="form-control" rows="3" v-model="formanswer"></textarea>
          </div>
          <button class="btn btn-primary" @click="addAnswer()" v-if="token">Submit</button>
        </div>
      </div>

      <!-- Single Comment -->
      <div class="media mb-4" v-for="(ans,i) in answer" :key="i">
        <div class="row" style="margin-left:10px">
          <div class="col-md-2">
            <div class="rows">
              <div class="row" v-if="token && ans.UserId._id !== UserId">
                <i class="fa fa-hand-o-up" style="font-size:24px;cursor:pointer" @click="plusAnswer(ans._id,i)"></i>
              </div>
              <div class="row">
                <h2>{{ans.point.length || 0}}</h2>
              </div>
              <div class="row" v-if="token && ans.UserId._id !== UserId">
                <i class="fa fa-hand-o-down" style="font-size:24px;cursor:pointer" @click="minusAnswer(ans._id,i)"></i>
              </div>
            </div>
          </div>
          <div class="col-md-10">
            <img class="d-flex mr-3 rounded-circle" :src="ans.UserId.image_url" alt="">
            <div class="media-body">
              <h5 class="mt-0">{{ans.UserId.name}}</h5> {{ans.answer}}
            </div>
            <div v-if="UserId === ans.UserId._id">
              <i class="fa fa-edit" style="font-size:24px;cursor:pointer" data-toggle="modal" :data-target="'#update'+ans._id"></i>
              <i class="fa fa-trash" style="font-size:24px;cursor:pointer" @click="destroyAnswer(ans._id)"></i>
            </div>
            <div class="modal" :id="'update'+ans._id">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Create</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="updatedAnswer(ans._id,i)">
                      <fieldset>
                        <div class="form-group">
                          <label for="tiles">Answer</label>
                          <input type="text" class="form-control" v-model="updateAnswer.answer" :placeholder="'Update your Answer '+ans.answer+'?'">
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div>
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
    <div class="modal" id="update">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updatedQuestion()">
              <fieldset>
                <div class="form-group">
                  <label for="tiles">Title</label>
                  <input type="text" class="form-control" v-model="question.title" placeholder="Title Your Question">
                </div>
                <div class="form-group">
                  <label for="tiles">Question</label>
                  <textarea type="text" class="form-control" v-model="question.question" placeholder="Your Question">
                          </textarea>
                </div>
                <div class="form-group">
                  <label for="tile">Category</label>
                  <select v-model="question.category">
                          <option v-for="category in categories" :value="category._id" :key="category._id">
                              {{ category.name }}
                          </option>
                          </select>
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Submit</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  data() {
    return {
      categories: [],
      question: {},
      answer: [],
      formanswer: '',
      updateAnswer: {},
    };
  },
  created() {
    this.start();
    this.$store.dispatch('getQuestions')
    this.$store.dispatch('getCategories')
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
    UserId() {
      return this.$store.state.UserId;
    },
  },
  props: ['id'],
  methods: {
    start() {
      this.$axios
        .get('/category')
        .then(({
          data
        }) => {
          this.categories = data;
          this.$axios
            .get(`/question/${this.id}`)
            .then(({
              data
            }) => {
              this.question = data;
              this.$axios
                .get(`/answer/question/${this.id}`)
                .then(({
                  data
                }) => {
                  this.answer = data.sort((a, b) => b.point > a.point);
                })
                .catch((err) => {
                  this.$notify({
                type: 'error',
                text: err.message,
              });
                });
            })
            .catch((err) => {
              cthis.$notify({
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
    addAnswer() {
      this.$axios
        .post(
          '/answer', {
            answer: this.formanswer,
            QuestionId: this.id,
            point: 0,
          }, {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({
          data
        }) => {
          this.formanswer = ""
          this.start();
          this.$notify({
            type: 'success',
            text: 'Terima kasih, Jawaban anda telah dikirim ke email penanya',
          });
        })
        .catch((err) => {
          this.$notify({
                type: 'error',
                text: err.message,
              });
        });
    },
    plusQuestion(id) {
      let check=[]
      if(this.question.point.length>0){
          check = this.question.point.filter(e=>{
          return e == this.UserId
        })
      }
        if(check[0]){
          this.$notify({
            type: 'error',
            text: 'Anda sudah menambahkan Pertanyaan ini sebelumnya',
          });
        }else{
          this.$axios
            .put(
              `/question/point/${id}`, {
                point: this.UserId,
              }, {
                headers: {
                  token: localStorage.getItem('token'),
                },
              },
            )
            .then(({
              data
            }) => {
              this.start();
            })
            .catch((err) => {
              this.$notify({
                type: 'error',
                text: err.message,
              });
            });
        }
    },
    minusQuestion(id) {
      if (this.question.point.length> 0) {
        let check = this.question.point.filter(e=>{
          return e == this.UserId
        })
        if(!check[0]){
          this.$notify({
            type: 'error',
            text: 'Anda harus menambahkan point ini sebelumnya agar penanya merasa tidak dianggap',
          });
        }else{
        this.$axios
          .put(
            `/question/minuspoint/${id}`, {
              point: this.UserId,
            }, {
              headers: {
                token: localStorage.getItem('token'),
              },
            },
          )
          .then(({
            data
          }) => {
            this.start();
          })
          .catch((err) => {
            this.$notify({
                type: 'error',
                text: err.message,
              });
          });
        }
      } else {
        this.$notify({
          type: 'error',
          text: 'Point Sudah tidak bisa dikurangi',
        });
      }
    },
    plusAnswer(id, index) {
      let check=[]
      if(this.answer[index].point.length>0){
      check = this.answer[index].point.filter(e=>{
          return e == this.UserId
        })
      }
        if(check[0]){
          this.$notify({
            type: 'error',
            text: 'Anda sudah menambahkan jawaban ini sebelumnya',
          });
        }else{
          this.$axios
            .put(
              `/answer/point/${id}`, {
                point: this.UserId,
              }, {
                headers: {
                  token: localStorage.getItem('token'),
                },
              },
            )
            .then(({
              data
            }) => {
              this.start();
            })
            .catch((err) => {
              this.$notify({
                type: 'error',
                text: err.message,
              });
            });
        }
    },
    minusAnswer(id, index) {
      if (this.answer[index].point.length> 0) {
        let check = this.answer[index].point.filter(e=>{
          return e == this.UserId
        })
        if(!check[0]){
          this.$notify({
            type: 'error',
            text: 'Anda harus menambahkan point ini sebelumnya agar penanya merasa tidak dianggap',
          });
        }else{
          this.$axios
          .put(
            `/answer/minuspoint/${id}`, {
              point: this.UserId,
            }, {
              headers: {
                token: localStorage.getItem('token'),
              },
            },
          )
          .then(({
            data
          }) => {
            this.start();
          })
          .catch((err) => {
            this.$notify({
                type: 'error',
                text: err.message,
              });
          });
        }
      } else {
        this.$notify({
          type: 'error',
          text: 'Point Sudah tidak bisa dikurangi',
        });
      }
    },
    destroyQuestion() {
      this.$axios
        .delete(`/question/${this.id}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.$router.push({
            name: 'category',
          });
          this.$notify({
            type: 'warning',
            text: 'Data Berhasil dihapus',
          });
        })
        .catch((err) => {
          this.$notify({
                type: 'error',
                text: err.message,
              });
        });
    },
    destroyAnswer(id) {
      this.$axios
        .delete(`/answer/${id}`, {
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then(() => {
          this.start();
          this.$notify({
            type: 'warning',
            text: 'Data Berhasil dihapus',
          });
        })
        .catch((err) => {
          this.$notify({
                type: 'error',
                text: err.message,
              });
        });
    },
    updatedQuestion() {
      this.$axios
        .put(
          `/question/${this.id}`, {
            title: this.question.title,
            question: this.question.question,
            CategoryId: this.question.category,
          }, {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(() => {
          this.start();
          $('#update').modal('hide');
          this.$notify({
            type: 'success',
            text: 'Data Berhasil diupdate',
          });
        })
        .catch((err) => {
          this.$notify({
                type: 'error',
                text: err.message,
              });
        });
    },
    updatedAnswer(id, index) {
      this.$axios
        .put(
          `/answer/${id}`, {
            answer: this.updateAnswer.answer,
            QuestionId: this.id,
          }, {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({
          data
        }) => {
          this.start();
          $(`#update${id}`).modal('hide');
          this.$notify({
            type: 'success',
            text: 'Data Berhasil diupdate',
          });
        })
        .catch((err) => {
          this.$notify({
                type: 'error',
                text: err.message,
              });
        });
    },
  },
};
</script>

<style scoped>
#question {
  text-align: left;
}
</style>
