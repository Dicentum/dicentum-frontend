<script>
export default {
  name: 'HomeView',
}
</script>

<template>
  <h1>Hiya!</h1>
  <hr style="border-top: 1px solid #8c8b8b;">
  <BCarousel controls indicators ride="carousel">
    <BCarouselSlide img-src="https://picsum.photos/1024/256/?image=13" />
    <BCarouselSlide img-src="https://picsum.photos/1024/256/?image=14" />
    <BCarouselSlide img-src="https://picsum.photos/1024/256/?image=15" />
  </BCarousel>
  <hr style="border-top: 1px solid #8c8b8b;">
  <p style="text-align: justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ducimus minima repellendus tenetur. Blanditiis culpa deserunt, distinctio, doloribus enim error explicabo libero numquam officiis pariatur provident quibusdam rem sint tenetur, totam voluptatem voluptatum! Accusamus accusantium architecto, aut beatae corporis dolore ducimus eaque eligendi est expedita illum inventore iusto natus necessitatibus nemo nulla obcaecati officiis porro quasi, quisquam reprehenderit rerum saepe sapiente, ullam ut veritatis voluptates? Animi aperiam aspernatur assumenda atque beatae commodi consequuntur, eos eum eveniet expedita fugiat harum hic ipsa ipsum laborum, minima molestiae mollitia nihil non possimus provident, qui repellendus veritatis? Exercitationem, ipsum laboriosam nam nobis perferendis quibusdam?</p>
  <hr style="border-top: 1px solid #8c8b8b;">
  <BCardGroup deck>
    <BCard title="Title" img-src="https://picsum.photos/300/100/?image=41" img-alt="Image" img-top>
      <BCardText>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.
      </BCardText>
      <template #footer>
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </template>
    </BCard>

    <BCard title="Title" img-src="https://picsum.photos/300/100/?image=41" img-alt="Image" img-top>
      <BCardText>
        This card has supporting text below as a natural lead-in to additional content.
      </BCardText>
      <template #footer>
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </template>
    </BCard>

    <BCard title="Title" img-src="https://picsum.photos/300/100/?image=41" img-alt="Image" img-top>
      <BCardText>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This card has even longer content than the first to show that equal height action.
      </BCardText>
      <template #footer>
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </template>
    </BCard>
  </BCardGroup>
  <hr style="border-top: 1px solid #8c8b8b;">
  <BAccordion>
    <BAccordionItem title="Accordion Item #1" visible>
      <strong>This is the first item's accordion body.</strong> It is shown by default, until the
      collapse plugin adds the appropriate classes that we use to style each element. These classes
      control the overall appearance, as well as the showing and hiding via CSS transitions. You can
      modify any of this with custom CSS or overriding our default variables. It is also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>, though the transition
      does limit overflow.
    </BAccordionItem>
    <BAccordionItem title="Accordion Item #2">
      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
      collapse plugin adds the appropriate classes that we use to style each element. These classes
      control the overall appearance, as well as the showing and hiding via CSS transitions. You can
      modify any of this with custom CSS or overriding our default variables. It is also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>, though the transition
      does limit overflow.
    </BAccordionItem>
    <BAccordionItem title="Accordion Item #3">
      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
      collapse plugin adds the appropriate classes that we use to style each element. These classes
      control the overall appearance, as well as the showing and hiding via CSS transitions. You can
      modify any of this with custom CSS or overriding our default variables. It is also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>, though the transition
      does limit overflow.
    </BAccordionItem>
  </BAccordion>
</template>

<style scoped>

</style>