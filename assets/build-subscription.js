document.addEventListener("DOMContentLoaded", () => {
  const pre_paid_increase = document.querySelectorAll(".pre-paid-increase-icon");
  const pre_paid_input = document.querySelector(".payment-plan-description-pre-paid input");

  pre_paid_increase.forEach(ele => {
    ele.addEventListener("click", (event) => {
      let pre_paid_value = parseInt(pre_paid_input.value);
      if(pre_paid_value <= 0 || pre_paid_value > 100) {
        return;
      }
      if(event.target.classList.contains("pre-paid-minus")) {
        pre_paid_value --;
      } else {
        pre_paid_value ++;
      }
      pre_paid_input.value = pre_paid_value;
    });
  })
});
