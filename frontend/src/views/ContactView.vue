<template>
<div class="text-white text-center bg-black">
    <h1>Contact Us</h1>
  
    <div class="row">
        <div class="col">
            <div class="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-5eb667bb">
        <img src="https://legends-barber.com/wp-content/uploads/2022/10/Cellphone-150x150.png" width="150"  height="150" alt="">
        <h2>Contact Us</h2>
        <h2>Reach us on <br>0656013640</h2>
        <a class="elementor-button elementor-button-link elementor-size-sm" href="tel:0656013640">
            <span class=" btn text-white bg-dark elementor-button-text">Click To Call</span>
        </a>
    </div>
        </div>
        <div class="col">
            <div class="elementor-column elementor-col-20 elementor-top-column elementor-element elementor-element-5b920af">
        <img src="https://legends-barber.com/wp-content/uploads/2022/10/email-150x150.png" width="150" height="150" alt="">
        <h2>Email Us</h2>
        <h2>Reach Us On <br> Gentleman`s-Barber@gmail.com`</h2>
        <a class="elementor-button elementor-button-link elementor-size-sm" href="mailto:info@legends-barber.com">
            <span class="btn text-white bg-dark">Email Now</span>
        </a>
    </div>

        </div>
    </div>

    <div class="contact-wrapper mx-auto mt-5">

<!-- Left contact page -->

<form id="contact-form" class="form-horizontal" action="https://formspree.io/f/xjvqlqny" method="post">

  <div class="form-group mt-5">
    <div class="col">
      <input type="text" class="form-control" id="name" placeholder="FULL NAME" name="name" value="" required>
    </div>
  </div>

  <div class="form-group">
    <div class="col-sm-12">
      <input type="email" class="form-control" id="email" placeholder="EMAIL" name="email" value="" required>
    </div>
  </div>

  <textarea class="form-control" rows="10" placeholder="MESSAGE" name="message" required></textarea>

  <button class="btn btn-dark send-button mb-5 mt-4 " id="submit" type="submit" value="SEND">
    <div class="alt-send-button">
      <i class="bi bi-send"></i><span class="send-text">SEND</span>
    </div>


  </button>

</form>


<!-- Right contact page -->

<div class="direct-contact-container mt-5">

  <ul class="contact-list mb-5">
    <li class="list-item"><i class="bi bi-geo-alt"><span class="contact-text place">South Africa,Cape
          Town</span></i></li>

  </ul>

  <hr>
  <ul class="social-media-list">

    <a href="https://github.com/Simamkele20" target="_blank" class="contact-icon">
      <i class="bi bi-github" aria-hidden="true"></i>
    </a>

    <a href="https://www.linkedin.com/in/simamkele-tancu-a74744262/" target="_blank" class="contact-icon">
      <i class="bi bi-linkedin" aria-hidden="true"></i>
    </a>


  </ul>
  <hr>
</div>
</div>

   




</div>

</template>


<style scoped>
/*  Contact Content */
.ContHead {
  font-family: "Nosifer", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: xx-large;
  padding-top: 550px;
  padding-left: 10px;
  padding-bottom: 60px;
}

.Cont1 {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(https://i.ibb.co/pjdXK0q/istockphoto-1032694350-612x612.jpg) no-repeat
      top center fixed;
  -webkit-background-size: cover;
  background-size: cover;
  padding-top: 50px;
  margin-bottom: -10px;
}

#contact {
  width: 100%;
  height: 100%;
  margin-top: 11px;
  padding-top: 50px;
}

.section-header {
  text-align: center;
  margin-top: 17px;
  padding: 40px 0;
  font: 300 60px "Oswald", sans-serif;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 6px;
}

.contact-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  max-width: 840px;
}

/* Left contact page */
.form-horizontal {
  /*float: left;*/
  max-width: 400px;
  font-family: "Lato";
  font-weight: 400;
}

.form-control,
textarea {
  max-width: 400px;
  background-color: #fff9f9ec;
  color: #000000;
  letter-spacing: 1px;
}

.send-button {
  margin-top: 15px;
  height: 34px;
  width: 400px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.alt-send-button {
  width: 400px;
  height: 34px;
  transition: all 0.2s ease-in-out;
}

.send-text {
  display: block;
  margin-top: 10px;
  font: 700 12px "Lato", sans-serif;
  letter-spacing: 2px;
}

.alt-send-button:hover {
  transform: translate3d(0px, -29px, 0px);
}

/* Begin Right Contact Page */
.direct-contact-container {
  max-width: 400px;
}

/* Location, Phone, Email Section */
.contact-list {
  list-style-type: none;
  margin-left: -30px;
  padding-right: 20px;
}

.list-item {
  line-height: 4;
  color: #000000;
}

.contact-text {
  font: 300 18px "Lato", sans-serif;
  letter-spacing: 1.9px;
  color: #000000;
}

.place {
  margin-left: 62px;
}

.phone {
  margin-left: 56px;
}

.gmail {
  margin-left: 53px;
}

.contact-text a {
  color: #000000;
  text-decoration: none;
  transition-duration: 0.2s;
}

.contact-text a:hover {
  color: #7d7878;
  text-decoration: none;
}

/* Social Media Icons */
.social-media-list {
  position: relative;
  font-size: 22px;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

.contact-icon {
  color: #000000;
}

.contact-icon {
  position: relative;
  display: inline-block;
  height: 60px;
  width: 60px;
  margin: 10px 3px;
  line-height: 60px;
  border-radius: 50%;
  color: #ffffff;
  background-color: rgb(27, 27, 27);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.contact-icon:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 0 1px #fff;
  transition: all 0.2s ease-in-out;
}

.contact-icon:hover {
  background-color: #505050;
}

.contact-icon:hover:after {
  opacity: 1;
  transform: scale(1.12);
  transition-timing-function: cubic-bezier(0.37, 0.74, 0.15, 1.65);
}

.contact-icon:hover {
  color: #ffffff;
}

hr {
  border-color: rgba(255, 255, 255, 0.6);
}

/* Media Query */
/* Contact Page */
@media screen and (max-width: 1024px) {
  .contact-wrapper {
    display: flex;
    flex-direction: column;
  }
  .direct-contact-container,
  .form-horizontal {
    margin: 0 auto;
  }

  .direct-contact-container {
    margin-top: 60px;
    max-width: 300px;
  }
  .social-media-list a {
    height: 60px;
    width: 60px;
    line-height: 60px;
  }
  .social-media-list a:after {
    width: 60px;
    height: 60px;
    line-height: 60px;
  }
 
}
</style>



