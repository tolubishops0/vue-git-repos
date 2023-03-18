<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, computed } from "vue";

const repos = ref([]);
const loading = ref(true);
const page = ref(1);

const fetchRepos = async () => {
  loading.value = true;
  const response = await fetch("https://api.github.com/users/tolubishops0/repos");
  const data = await response.json();
  repos.value = data;
  console.log(repos.value);

  loading.value = false;
};


const reposPerPage = 5;
const nextPage = computed(() => {
  return repos.value.slice((page.value - 1) * reposPerPage, reposPerPage * page.value);
});

const handleRepos = (num) => {
  page.value = num;
};

const next = () => {
  page.value++;
};

const prev = () => {
  page.value--;
};

const convertDate = (date) => {
  const [weekDay, month, day, year] = new Date(date).toDateString().split(" ");
  return `${weekDay}, ${month}, ${day}, ${year}`;
};

onMounted(() => {
  fetchRepos();
});
</script>

<template>
 
    
  <body>
    <h1  class="header">Welcome to the homepage, click on a repo to get more info on</h1>

      <div v-if="loading">loading...</div>
        <main  v-else>
        <ul class="repo-list">
          <li class="list" v-for="repo in nextPage" :key="repo.id.value" >
            <RouterLink :to="`/repo/${repo.name}`">
            <h2 class="title">
              {{ repo.name }}
            </h2>

           </RouterLink>
           
          </li>
        </ul>
    
  <div class="btn-container">
      <button :disabled="page == 1" @click="prev" class="btn">Prev</button>

      <div >
        <button class="num"
          @click="handleRepos(btn)"
          v-for="btn in Math.ceil(repos.length / reposPerPage)"
          :key="btn"
        >
          {{ btn }}
        </button>
      </div>

      <button
        :disabled="page == Math.ceil(repos.length / reposPerPage)"
        @click="next"
        class="btn"
      >
        Next
      </button>
    </div>

        </main>
        </body>
</template>

<style scoped>

*{
  background-color: rgb(113, 186, 255);
 
}
body{
  padding: 80px;
}

ul{
  text-align: center;
  color: blue;
}



.repo-list{
  padding-bottom: 30px;
  padding-top: 30px;
}

ul > li :hover{
  color: white;
}

.title{
  text-transform: capitalize;
}

.list{
  border-bottom: 5px;
}

.header {
 text-align: center;
 color: white;
 height: 50px;
}












.btn-container{
  display: flex;
  padding: 2px 5px;
    justify-content: center;
  
}

.btn:disabled{
background-color: gray;
}
.btn{
  color: white;
  background-color: black;
  border-radius: 5px;
  padding:0 5px ;
  margin: 0 10px;
  }

  .btn:hover{
    background-color: white;
    color: black;
  }

  .num:hover{
    background-color: white;
    color: black;
  }

  .num{
    margin-right: 10px;
  }

</style>
