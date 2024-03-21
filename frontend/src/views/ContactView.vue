<template>
  <div class="container-fluid bg-black text-white pt-2 pb-5">
    <h1 class="hea text-center p-5">Contact Us </h1>
    <div class="contact-wrapper">

      <!-- Left contact page -->
      <form id="contact-form" class="form-horizontal" action="https://formspree.io/f/xjvqlqny" method="post">

        <div class="form-group mt-5">
          <div class="col">
            <input type="text" class="form-control" id="name" placeholder="NAME" name="name" value="" required>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-12 mt-1">
            <input type="email" class="form-control" id="email" placeholder="EMAIL" name="email" value="" required>
          </div>
        </div>

        <textarea class="form-control mt-1" rows="10" placeholder="MESSAGE" name="message" required></textarea>

        <div class="btn-group d-block d-md-flex" role="group">
          <button class="btn btn-dark mb-5 mt-4  px-5 " type="reset">Clear</button>
          <button class="btn btn-dark send-button mb-5 mt-4  w-50 mx-5" id="submit" type="submit" value="SEND">
            <div class="alt-send-button w-25 mx-5 px-4" >
              <i class="bi bi-send "></i><span class="send-text">SEND</span>
            </div>
          </button>
        </div>

      </form>



      <!-- Right contact page -->

      <div class="direct-contact-container mt-5  ">
        <ul class="contact-list mx-2 mb-5">
          <li class="list-item"><i class="bi bi-geo-alt"><span class="contact-text place">South Africa,Cape
                Town</span></i></li>

          <li class="list-item"><i class="bi bi-telephone-fill"><span class="contact-text phone"><a
                  href="tel:+27 65 6013 640" title="Give me a call">(+27) 656 013 640</a></span></i></li>

          <li class="list-item"><i class="bi bi-envelope"><span class="contact-text gmail "><a
                  href="mailto:GentlemansEdgeBarber@gmail.com" title="Send me an email">
                  <h6 class="ema">GentlemansEdgeBarber@gmail.com</h6>
                </a></span></i></li>

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


<style src="../assets/css/style.css"></style>