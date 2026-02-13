document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const cardContainers = document.querySelectorAll(".card-container");

  cardContainers.forEach((cardContainer) => {
    const cardPaths = cardContainer.querySelectorAll(".svg-stroke path");
    const cardTitle = cardContainer.querySelector(".card-title h3");

    const split = SplitText.create(cardTitle, {
      type: "words",
      mask: "words",
    });

    gsap.set(split.words, { yPercent: 100 });

    cardPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    let tl;

    cardContainer.addEventListener("mouseenter", () => {
      if (tl) tl.kill();
      tl = gsap.timeline();

      cardPaths.forEach((path) => {
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            attr: { "stroke-width": 250 },
            duration: 2,
            ease: "power2.out",
          },
          0,
        );
      });

      tl.to(
        split.words,
        {
          yPercent: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.075,
        },
        0.35,
      );
    });

    cardContainer.addEventListener("mouseleave", () => {
      if (tl) tl.kill();
      tl = gsap.timeline();

      cardPaths.forEach((path) => {
        const length = path.getTotalLength();
        tl.to(
          path,
          {
            strokeDashoffset: length,
            attr: { "stroke-width": 50 },
            duration: 1,
            ease: "power2.out",
          },
          0,
        );
      });

      tl.to(
        split.words,
        {
          yPercent: 100,
          duration: 0.5,
          ease: "power3.out",
          stagger: { each: 0.05, from: "end" },
        },
        0,
      );
    });
  });
});
