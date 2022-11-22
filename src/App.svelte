<script>
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "./lib/components/Navbar.svelte";
  import Activities from "./lib/pages/Activities.svelte";
  import Discovery from "./lib/pages/Discovery.svelte";
  import Home from "./lib/pages/Home.svelte";
  import Login from "./lib/views/auth/Login.svelte";
  import MarkdownEditor from "./lib/pages/MarkdownEditor.svelte";
  import Profile from "./lib/pages/Profile.svelte";
  import Register from "./lib/views/auth/Register.svelte";
  import ResetPassword from "./lib/views/auth/ResetPassword.svelte";
  import CreatePost from "./lib/views/post/CreatePost.svelte";
  import Collections from "./lib/pages/Collections.svelte";
  import EditPost from "./lib/views/post/EditPost.svelte";
  import ViewPost from "./lib/views/post/ViewPost.svelte";
  import Articles from "./lib/pages/Articles.svelte";
  import CreateArticle from "./lib/views/article/CreateArticle.svelte";
  import ViewArticle from "./lib/views/article/ViewArticle.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="login" component={Login} />
  <Route path="signup" component={Register} />
  <Route path="reset-password" component={ResetPassword} />

  <Route path="/">
    <Navbar active="home" />
    <Home />
  </Route>

  <Route path="profile">
    <Navbar active="profile" />
    <Profile />
  </Route>

  <Route path="articles">
    <Navbar active="profile" />
    <Articles />
  </Route>

  <Route path="activities">
    <Navbar active="profile" />
    <Activities />
  </Route>

  <Route path="collections">
    <Navbar active="profile" />
    <Collections />
  </Route>

  <!-- article -->
  <Route path="article/test" let:params>
    <Navbar active="article" />
    <ViewArticle />
  </Route>

  <Route path="article/create">
    <Navbar active="article" />
    <CreateArticle />
  </Route>
  <!-- end article -->

  <!-- post -->
  <Route path="post/:id" let:params>
    <Navbar active="post" />
    <ViewPost idPost={params.id} />
  </Route>

  <Route path="post/create">
    <Navbar active="post" />
    <CreatePost />
  </Route>

  <Route path="post/edit/:id" let:params>
    <Navbar active="post" />
    <EditPost idPost={params.id} />
  </Route>

  <Route path="create-post">
    <Navbar active="post" />
    <CreatePost />
  </Route>
  <!-- end post -->

  <Route path="discovery">
    <Navbar active="discovery" />
    <Discovery />
  </Route>

  <Route path="editor">
    <Navbar active="editor" />
    <MarkdownEditor />
  </Route>
</Router>
