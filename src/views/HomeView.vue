<script>
export default {
  name: 'HomeView',
}
</script>

<template>
  <h1>Welcome to Dicentum!</h1>
  <hr style="border-top: 1px solid #8c8b8b;">
  <BCarousel controls indicators ride="carousel">
    <BCarouselSlide v-lazy="'https://i.imgur.com/AVsnnb8.png'" />
    <BCarouselSlide v-lazy="'https://i.imgur.com/lFK57v2.png'" />
    <BCarouselSlide v-lazy="'https://i.imgur.com/nnD52Ig.png'" />
  </BCarousel>
  <hr style="border-top: 1px solid #8c8b8b;">
  <p style="text-align: justify">We're thrilled to have you join us on this journey towards fostering constructive debates and discussions. At Dicentum, our mission is to provide a platform for managing groups of individuals engaged in dialogues of various natures, whether they be parliamentary sessions, community meetings, or corporate brainstorming sessions.</p>
  <hr style="border-top: 1px solid #8c8b8b;">
  <BCardGroup deck>
    <BCard title="v.1.2.0 is out" img-src="https://i.imgur.com/32fS43a.png" img-alt="Image" img-top>
      <BCardText>
        This includes the first version of the platform, plus secure voting and encrypted messages capabilities.
      </BCardText>
      <template #footer>
        <small class="text-body-secondary">Last updated 11/05/2024</small>
      </template>
    </BCard>

    <BCard title="Dicentum?" img-src="https://i.imgur.com/AdpG0lR.png" img-alt="Image" img-top>
      <BCardText>
      Dicentum is the final project of my bachelor's degree in Computer Science. But I will continue to develop it and add new features, even after the project is finished.
      </BCardText>
      <template #footer>
        <small class="text-body-secondary">Last updated 01/05/2024</small>
      </template>
    </BCard>

    <BCard title="What is a PassKey?" img-src="https://i.imgur.com/Yeto6l9.png" img-alt="Image" img-top>
      <BCardText>
        A passkey is a digital credential, tied to a user account and a website or application. Passkeys allow users to authenticate without having to enter any additional data. It's like magic!
      </BCardText>
      <template #footer>
        <small class="text-body-secondary">Last updated 12/04/2024</small>
      </template>
    </BCard>
  </BCardGroup>
  <hr style="border-top: 1px solid #8c8b8b;">
  <BAccordion>
    <BAccordionItem title="What is the goal?">
      Our primary goal is to facilitate these interactions through the development of a robust software system. This system will not only streamline the process of organizing debates and discussions but will also ensure the security and integrity of the voting process associated with these deliberations.
    </BAccordionItem>
    <BAccordionItem title="Can everyone use it?">
      At the moment Dicentum counts with the MIT License, so you can use it for free. But remember, it's a project in development, so it may have some bugs.
    </BAccordionItem>
    <BAccordionItem title="What are the technology behind?">
      Dicentum is built with Vue.js, Node.js, Express.js, and MongoDB. It also uses BootstrapVue for the UI components.
    </BAccordionItem>
  </BAccordion>
  <hr style="border-top: 1px solid #8c8b8b;">
  <p>We invite you to explore our platform, engage in meaningful exchanges, and contribute to the advancement of productive discourse in your respective spheres.</p>
</template>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.loading-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 1em;
}
.spinner-loading-class {
  margin-right: 10px;
}
</style>