<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const repo = ref({});
const loading =ref(false);
  
const {params} = useRoute();
const router = useRouter()
const url = `https://api.github.com/repos/tolubishops0/${params.name}`;
const fetchData = async () => {
      try {
        loading.value = true;
        const response = await fetch(
         url
        );
       const data = await response.json() ;
        repo.value = data
        
        console.log(repo.value)
        loading.value =false;
      } catch (error) {
        console.log(error)
      }
    };
    onMounted(() => {
        fetchData()
    })
</script>

<template>
    <div v-if="loading">Loading...</div>

<div class="data" v-else>
      <h1 className="repo-head">Repository Data</h1>
      <div class="">
 <p>
        <h3>Name: {{repo.name}}</h3> 
      </p>
      <p>
        <h3>Language: {{repo.language}}</h3> 
      </p>
      <p>
        <h3>ID: {{repo.id}}</h3> 
      </p>
      <p>
        <h3>Date of Creation: {{repo.created_at}}</h3>
      </p>
      </div>
     
     
  
      <button class="btn" @click="router.push('/')">Go Back</button>
    </div>
</template>

<style scoped>
*{
  background-color: rgb(113, 186, 255);
}

.data{
  padding: 20px;
  text-align: center;
  padding: 80px;
}
.repo-head{
  text-align: center;
}

.repo-list{
  color: white;
  padding: 10px;
}


h1{
  color: black;
}

h3{
  color: white;
  padding: 30px;
}
.btn{
 background-color: black;
 color: white;
 width: 80px;
 border-radius: 5px;
 padding: 5px;

}
</style>
