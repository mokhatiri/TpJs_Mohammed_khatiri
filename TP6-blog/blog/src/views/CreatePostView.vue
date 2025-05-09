<template>
    <h1>Create a Post</h1>
    <div id="container">
      <div id="post-form">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" name="title" placeholder="Enter a title">
        </div>

        <div>
          <label for="userText">Enter your text:</label>
          <textarea id="userText" v-model="content" rows="4" cols="50" placeholder="Write something..."></textarea>
        </div>
      </div>
      <div id="tags-form">
        <h2>filter:</h2>
          <!-- first the search bar -->
          <div class="selected_tags">
              <div v-for="tag in selectedTags" :key="tag" @click="removeTag(tag)">{{ tag }}</div>
          </div>
          
          <label for="search">Search the tags:</label>
          <input type="text" v-model="tagFilter" placeholder="search the tags">
          <!-- then the tag cloud -->
          <div class="tag-cloud">
              <div v-for="tag in filteredTags" :key="tag" @click="addTag(tag)">{{ tag }}</div>
          </div>

          <div>
            <input type="text" v-model="newTag" placeholder="Add new tag" />
            <button type="button" @click="addNewTag()">Add Tag</button>
          </div>
      </div>
    </div>

    <div>
      <a @click="submitPost()" id="submit-button">Submit</a>
    </div>

  </template>
  
  <script>
  import data from '@/assets/posts.json';
  
  // when hover over submit make the background of container green

  export default {
    name: 'CreatePostView',
    data() {
      return {
        title: '',
        content: '',
        tags: [],  // Tags will be an array to store multiple selections
        newTag: '', // To store new tag input
        tagFilter: '', // For searching tags
        selectedTags: [], // Initially, display all available tags
        router: null,
      };
    },
    computed: {
      filteredTags() {
        return this.tags.filter(tag =>
          tag.toLowerCase().includes(this.tagFilter.toLowerCase())
        );
      },
    },
    mounted() {
      // Initialize selectedTags with all available tags
      this.tags = [...data.tags];
    }
    ,
    methods: {
      removeTag(tag) {
        this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      },  
      addTag(tag) {
        // first check if the tag is already in the selectedTags array
        if (!this.selectedTags.includes(tag)) {
          this.selectedTags.push(tag);
        }
      },
      addNewTag(){
        if (this.newTag.trim() !== '') {
          this.tags.push(this.newTag);
          this.newTag = '';
        }
      },
      submitPost() {
        // Generate new post ID by incrementing the last ID in `ids`
        const newPostId = data.ids + 1;
  
        // Create a new post object
        const newPost = {
          id: newPostId,
          title: this.title,
          content: this.content,
          tags: this.selectedTags,
        };
  
          // Add the new post to the `posts` array
        if(!data.posts.some(post => post.title === newPost.title)) {
          if(newPost.content == ""){
            alert("Please enter a title and content");
          }
          else{
            data.posts.push(newPost);
    
            // Update the `ids` to the new post ID
            data.ids = newPostId;
            data.tags = this.tags;

            // Handle post submission logic (e.g., save data to a backend)
            console.log("Post submitted:", newPost);
            this.$router.push({ name: 'home' });
          }
        }
        else{
          alert("Post already exists");
        }        
      },
    },
  };
</script>
  
<style scoped>
  #container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;     
    min-height: 100vh;
  }
  #post-form {
    grid-column: 1/4;
    grid-row: 1;
  }
  #tags-form , #post-form {
    margin: 20px auto;
    padding: 20px;
    background: #1e1e1e; /* Dark mode background */
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(255, 136, 0, 0.2);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    color: white;
    font-family: 'Arial', sans-serif;
  }

  .selected_tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 10px 0;
  }

  .selected_tags div {
      background: #ff8800;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
  }

  .selected_tags div:hover {
      background: #cc6e00;
  }

  #tags-form {
    grid-column: 4;
    grid-row: 1;
  }

  #tags-form:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(255, 136, 0, 0.4);
  }


  label {
    color: #fdfdfd;
  }

  input, textarea, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 80%;
  }

  a {
  padding: 10px 20px;
  background-color: #ff8800;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  }

  a:hover {
  background-color: #45a049;
  #container {
    background-color: #45a0497a;
  }
  }

  button {
    padding: 10px 20px;
    background-color: #ff8800;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  button:hover {
    background-color: #cc6e00;
  }

  label {
  font-size: 18px;
  margin-bottom: 10px;
  display: block;
  }

  div {
  margin-bottom: 20px;
}


/* Headers */
h2 {
    color: #ff8800;
    text-align: center;
}

/* Inputs */
input , textarea{
    width: 100%;
    padding: 8px;
    margin: 8px 0;
    border: 1px solid #ff8800;
    border-radius: 6px;
    background: #2c2c2c;
    color: white;
    outline: none;
}

input::placeholder {
    color: #aaa;
}

.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
}

.tag-cloud div {
    background: #444;
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
}

.tag-cloud div:hover {
    background: #666;
}


</style>