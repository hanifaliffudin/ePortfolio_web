// ganti foto profile
$(".profile-picture-container").click(function (e) {
  $("#uploadLogoProject").click();
});

$("#uploadLogoProject").change(function () {
  fasterPreview(this);
});

function fasterPreview(uploader) {
  if (uploader.files && uploader.files[0]) {
    $(".logo-project").attr(
      "src",
      window.URL.createObjectURL(uploader.files[0])
    );
  }
}
