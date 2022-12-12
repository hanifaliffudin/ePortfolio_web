<script>
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "./lib/components/Navbar.svelte";
  import Activities from "./lib/views/profile/Activities.svelte";
  import Discovery from "./lib/pages/Discovery.svelte";
  import Home from "./lib/pages/Home.svelte";
  import Login from "./lib/views/auth/Login.svelte";
  import Profile from "./lib/views/profile/Profile.svelte";
  import Register from "./lib/views/auth/Register.svelte";
  import ResetPassword from "./lib/views/auth/ResetPassword.svelte";
  import CreatePost from "./lib/views/post/CreatePost.svelte";
  import Collections from "./lib/pages/Collections.svelte";
  import EditPost from "./lib/views/post/EditPost.svelte";
  import ViewPost from "./lib/views/post/ViewPost.svelte";
  import Articles from "./lib/views/profile/Articles.svelte";
  import CreateArticle from "./lib/views/article/CreateArticle.svelte";
  import ViewArticle from "./lib/views/article/ViewArticle.svelte";
  import EditProfile from "./lib/views/profile/EditProfile.svelte";
  import EditAbout from "./lib/views/profile/EditAbout.svelte";
  import EditSocMed from "./lib/views/profile/EditSocMed.svelte";
  import EditSkill from "./lib/views/profile/EditSkill.svelte";
  import EditArticle from "./lib/views/article/EditArticle.svelte";
  import AddBlock from "./lib/views/profile/AddBlock.svelte";
  import EditBlock from "./lib/views/profile/EditBlock.svelte";
  import ViewProfile from "./lib/views/userProfile/ViewProfile.svelte";
  import ViewArticles from "./lib/views/userProfile/ViewArticles.svelte";
  import ViewCollections from "./lib/views/userProfile/ViewCollections.svelte";
  import ViewActivities from "./lib/views/userProfile/ViewActivities.svelte";

  export let url = "";

  // get jwt from localstorage
  let jwt = localStorage.getItem("jwt");
</script>

<Router {url}>
  <Route path="login" component={Login} />
  <Route path="signup" component={Register} />
  <Route path="reset-password" component={ResetPassword} />

  <!-- if jwt null, to login -->
  {#if !jwt}
    <Route component={Login} />
  {:else}
    <Route path="/">
      <Navbar active="home" />
      <Home />
    </Route>

    <!-- Profile -->
    <Route path="profile">
      <Navbar active="profile" />
      <Profile />
    </Route>

    <Route path="edit-profile">
      <Navbar active="profile" />
      <EditProfile />
    </Route>

    <Route path="add-block">
      <Navbar active="profile" />
      <AddBlock />
    </Route>

    <Route path="edit-block/:index" let:params>
      <Navbar active="profile" />
      <EditBlock indexBlock={params.index} />
    </Route>

    <Route path="edit-about">
      <Navbar active="profile" />
      <EditAbout />
    </Route>

    <Route path="edit-socmed">
      <Navbar active="profile" />
      <EditSocMed />
    </Route>

    <Route path="edit-skill">
      <Navbar active="profile" />
      <EditSkill />
    </Route>
    <!-- End Profile -->

    <!-- Profile User -->
    <Route path="profile/:id" let:params>
      <Navbar active="user" />
      <ViewProfile userId={params.id} />
    </Route>

    <Route path="articles/:id" let:params>
      <Navbar active="user" />
      <ViewArticles userId={params.id} />
    </Route>

    <Route path="collections/:id" let:params>
      <Navbar active="user" />
      <ViewCollections userId={params.id} />
    </Route>

    <Route path="activities/:id" let:params>
      <Navbar active="user" />
      <ViewActivities userId={params.id} />
    </Route>
    <!-- End Profile User -->

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
    <Route path="article/:id" let:params>
      <Navbar active="article" />
      <ViewArticle idArticle={params.id} />
    </Route>

    <Route path="article/create">
      <Navbar active="article" />
      <CreateArticle />
    </Route>

    <Route path="article/edit/:id" let:params>
      <Navbar active="article" />
      <EditArticle idArticle={params.id} />
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
  {/if}
</Router>
