<script>
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "./lib/components/Navbar.svelte";
  import Posts from "./lib/views/post/Posts.svelte";
  import Discovery from "./lib/pages/Discovery.svelte";
  import Home from "./lib/pages/Home.svelte";
  import Login from "./lib/views/auth/Login.svelte";
  import Profile from "./lib/views/profile/Profile.svelte";
  import Register from "./lib/views/auth/Register.svelte";
  import ResetPassword from "./lib/views/auth/ResetPassword.svelte";
  import CreatePost from "./lib/views/post/CreatePost.svelte";
  import Activities from "./lib/views/activity/Activities.svelte";
  import EditPost from "./lib/views/post/EditPost.svelte";
  import ViewPost from "./lib/views/post/ViewPost.svelte";
  import Articles from "./lib/views/article/Articles.svelte";
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
  import ViewActivities from "./lib/views/userProfile/ViewActivities.svelte";
  import ViewPosts from "./lib/views/userProfile/ViewPosts.svelte";
  import AllPostResults from "./lib/views/discovery/AllPostResults.svelte";
  import AllArticleResults from "./lib/views/discovery/AllArticleResults.svelte";
  import AddActivity from "./lib/views/activity/AddActivity.svelte";
  import ViewActivity from "./lib/views/activity/ViewActivity.svelte";
  import AddFile from "./lib/views/album/AddFile.svelte";
  import EditActivity from "./lib/views/activity/EditActivity.svelte";
  import ViewBadges from "./lib/views/userProfile/ViewBadges.svelte";
  import Badges from "./lib/views/badge/Badges.svelte";
  import AddBadge from "./lib/views/badge/AddBadge.svelte";
  import EditBadge from "./lib/views/badge/EditBadge.svelte";
  import ViewBadge from "./lib/views/badge/ViewBadge.svelte";
  import Album from "./lib/views/album/Album.svelte";
  import AllPeopleResults from "./lib/views/discovery/AllPeopleResults.svelte";
  import AllActivityResults from "./lib/views/discovery/AllActivityResults.svelte";
  import AddTask from "./lib/views/activity/AddTask.svelte";
  import ViewTask from "./lib/views/activity/ViewTask.svelte";
  import EditTask from "./lib/views/activity/EditTask.svelte";
  import Projects from "./lib/views/project/Projects.svelte";
  import CreateProject from "./lib/views/project/CreateProject.svelte";
  import ViewProject from "./lib/views/project/ViewProject.svelte";
  import EditProject from "./lib/views/project/EditProject.svelte";
  import AddRoadmap from "./lib/views/project/AddRoadmap.svelte";
  import ViewRoadmap from "./lib/views/project/ViewRoadmap.svelte";
  import EditRoadmap from "./lib/views/project/EditRoadmap.svelte";
  import AddTaskRoadmap from "./lib/views/project/AddTaskRoadmap.svelte";
  import ViewTaskRoadmap from "./lib/views/project/ViewTaskRoadmap.svelte";
  import EditTaskRoadmap from "./lib/views/project/EditTaskRoadmap.svelte";
  import ViewProjects from "./lib/views/userProfile/ViewProjects.svelte";
  import AllProjectResults from "./lib/views/discovery/AllProjectResults.svelte";

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

    <Route path="activities/:id" let:params>
      <Navbar active="user" />
      <ViewActivities userId={params.id} />
    </Route>

    <Route path="projects/:id" let:params>
      <Navbar active="user" />
      <ViewProjects userId={params.id} />
    </Route>

    <Route path="posts/:id" let:params>
      <Navbar active="user" />
      <ViewPosts userId={params.id} />
    </Route>

    <Route path="badges/:id" let:params>
      <Navbar active="user" />
      <ViewBadges userId={params.id} />
    </Route>
    <!-- End Profile User -->

    <!-- activities -->
    <Route path="activities">
      <Navbar active="profile" />
      <Activities />
    </Route>

    <Route path="activity/add">
      <Navbar active="activity" />
      <AddActivity />
    </Route>

    <Route path="activity/:id" let:params>
      <Navbar active="activity" />
      <ViewActivity idActivity={params.id} />
    </Route>

    <Route path="activity/edit/:id" let:params>
      <Navbar active="article" />
      <EditActivity idActivity={params.id} />
    </Route>

    <Route path="activity/add-task/:id" let:params>
      <Navbar active="activity" />
      <AddTask idActivity={params.id} />
    </Route>

    <Route path="activity/:idActivity/task/:idTask" let:params>
      <Navbar active="activity" />
      <ViewTask idTask={params.idTask} idActivity={params.idActivity} />
    </Route>

    <Route path="activity/:idActivity/edit-task/:idTask" let:params>
      <Navbar active="activity" />
      <EditTask idTask={params.idTask} idActivity={params.idActivity} />
    </Route>

    <!-- end activities -->

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

    <Route path="articles">
      <Navbar active="profile" />
      <Articles />
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

    <Route path="posts">
      <Navbar active="profile" />
      <Posts />
    </Route>
    <!-- end post -->

    <!-- badge -->
    <Route path="badges">
      <Navbar active="profile" />
      <Badges />
    </Route>

    <Route path="/badge/add">
      <Navbar active="profile" />
      <AddBadge />
    </Route>

    <Route path="badge/:id" let:params>
      <Navbar active="badge" />
      <ViewBadge idBadge={params.id} />
    </Route>

    <Route path="badge/edit/:id" let:params>
      <Navbar active="profile" />
      <EditBadge idBadge={params.id} />
    </Route>
    <!-- end badge -->

    <!-- album -->
    <Route path="album">
      <Navbar active="profile" />
      <Album />
    </Route>

    <Route path="add-file">
      <Navbar active="album" />
      <AddFile />
    </Route>
    <!-- end album -->

    <!-- discovery -->
    <Route path="discovery">
      <Navbar active="discovery" />
      <Discovery />
    </Route>

    <Route path="/all/posts/:search" let:params>
      <Navbar active="discovery" />
      <AllPostResults searchKeyword={params.search} />
    </Route>

    <Route path="/all/articles/:search" let:params>
      <Navbar active="discovery" />
      <AllArticleResults searchKeyword={params.search} />
    </Route>

    <Route path="/all/activities/:search" let:params>
      <Navbar active="discovery" />
      <AllActivityResults searchKeyword={params.search} />
    </Route>

    <Route path="/all/projects/:search" let:params>
      <Navbar active="discovery" />
      <AllProjectResults searchKeyword={params.search} />
    </Route>

    <Route path="/all/peoples/:search" let:params>
      <Navbar active="discovery" />
      <AllPeopleResults searchKeyword={params.search} />
    </Route>
    <!-- end discovery -->

    <!-- project -->
    <Route path="projects">
      <Navbar active="profile" />
      <Projects />
    </Route>

    <Route path="/project/create">
      <Navbar active="profile" />
      <CreateProject />
    </Route>

    <Route path="/project/:id" let:params>
      <Navbar active="project" />
      <ViewProject idProject={params.id} />
    </Route>

    <Route path="/project/edit/:id" let:params>
      <Navbar active="project" />
      <EditProject idProject={params.id} />
    </Route>

    <Route path="/project/add-roadmap/:id" let:params>
      <Navbar active="project" />
      <AddRoadmap idProject={params.id} />
    </Route>

    <Route path="/project/:idProject/roadmap/:idRoadmap" let:params>
      <Navbar active="project" />
      <ViewRoadmap idProject={params.idProject} idRoadmap={params.idRoadmap} />
    </Route>

    <Route path="/project/:idProject/roadmap/:idRoadmap/edit" let:params>
      <Navbar active="project" />
      <EditRoadmap idProject={params.idProject} idRoadmap={params.idRoadmap} />
    </Route>

    <Route path="/project/:idProject/roadmap/:idRoadmap/add-task" let:params>
      <Navbar active="project" />
      <AddTaskRoadmap
        idProject={params.idProject}
        idRoadmap={params.idRoadmap}
      />
    </Route>

    <Route
      path="/project/:idProject/roadmap/:idRoadmap/task/:idTask"
      let:params
    >
      <Navbar active="project" />
      <ViewTaskRoadmap
        idTask={params.idTask}
        idProject={params.idProject}
        idRoadmap={params.idRoadmap}
      />
    </Route>

    <Route
      path="/project/:idProject/roadmap/:idRoadmap/edit-task/:idTask"
      let:params
    >
      <Navbar active="project" />
      <EditTaskRoadmap
        idTask={params.idTask}
        idProject={params.idProject}
        idRoadmap={params.idRoadmap}
      />
    </Route>
    <!-- end project -->
  {/if}
</Router>
