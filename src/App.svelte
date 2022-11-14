<script>
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "./lib/components/Navbar.svelte";
  import Activities from "./lib/pages/Activities.svelte";
  import Discovery from "./lib/pages/Discovery.svelte";
  import Home from "./lib/pages/Home.svelte";
  import MarkdownEditor from "./lib/pages/MarkdownEditor.svelte";
  import Post from "./lib/pages/Post.svelte";
  import Profile from "./lib/pages/Profile.svelte";
  import Project from "./lib/pages/Project.svelte";
  import Repository from "./lib/pages/Repository.svelte";

  export let url = "";
</script>

<Router {url}>
  <Navbar />

  <Route path="profile" component={Profile} />
  <Route path="activities" component={Activities} />
  <Route path="repository" component={Repository} />
  <Route path="project" component={Project} />
  <Route path="post" component={Post} />
  <Route path="discovery" component={Discovery} />
  <Route path="editor" component={MarkdownEditor} />
  <Route path="/"><Home /></Route>
</Router>
