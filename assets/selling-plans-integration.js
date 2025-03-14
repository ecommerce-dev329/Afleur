const hiddenClass = 'selling_plan_theme_integration--hidden';

class SellingPlansWidget {
	constructor(sellingPlansWidgetContainer) {
		this.enablePerformanceObserver();
		this.sellingPlansWidgetContainer = sellingPlansWidgetContainer;
		this.appendSellingPlanInputs();
		this.updateSellingPlanInputsValues();
		this.listenToVariantChange();
		this.listenToSellingPlanFormRadioButtonChange();
		this.updatePrice();
	}
	get sectionId() {
		return this.sellingPlansWidgetContainer.getAttribute('data-section-id');
	}
	get shopifySection() {
		return document.querySelector(`#shopify-section-${this.sectionId}`);
	}
	get variantIdInput() {
		return (
			this.addToCartForms[1]?.querySelector(`input[name="id"]`) ||
			this.addToCartForms[1]?.querySelector(`select[name="id"]`) ||
			this.addToCartForms[0].querySelector(`input[name="id"]`) ||
			this.addToCartForms[0].querySelector(`select[name="id"]`)
		);
	}
	get priceElement() {
		return this.shopifySection.querySelector('.price');
	}
	get comparedAtPrice() {
		return this.shopifySection.querySelector('.price__sale');
	}
	get visibleSellingPlanForm() {
		return this.shopifySection.querySelector(
			`section[data-variant-id^="${this.variantIdInput.value}"]`,
		);
	}
	get isVariantAvailable() {
		return this.selectedPurchaseOption.getAttributeNames().includes('disabled');
	}
	get sellingPlanInput() {
		return this.shopifySection.querySelector('.selected-selling-plan-id');
	}
	get addToCartForms() {
		return this.shopifySection.querySelectorAll('[action*="/cart/add"]');
	}
	appendSellingPlanInputs() {
		this.addToCartForms.forEach((addToCartForm) => {
			addToCartForm.appendChild(this.sellingPlanInput.cloneNode());
		});
	}
	showSellingPlanForm(sellingPlanFormForSelectedVariant) {
		sellingPlanFormForSelectedVariant?.classList?.remove(hiddenClass);
	}
	hideSellingPlanForms(sellingPlanFormsForUnselectedVariants) {
		sellingPlanFormsForUnselectedVariants.forEach((element) => {
			element.classList.add(hiddenClass);
		});
	}
	handleSellingPlanFormVisibility() {
		const sellingPlanFormForSelectedVariant = this.shopifySection.querySelector(
			`section[data-variant-id="${this.variantIdInput.value}"]`,
		);
		const sellingPlanFormsForUnselectedVariants =
			this.shopifySection.querySelectorAll(
				`.selling_plan_theme_integration:not([data-variant-id="${this.variantIdInput.value}"])`,
			);
		this.showSellingPlanForm(sellingPlanFormForSelectedVariant);
		this.hideSellingPlanForms(sellingPlanFormsForUnselectedVariants);
	}

	handleVariantChange() {
		this.handleSellingPlanFormVisibility();
		this.updateSellingPlanInputsValues();
		this.listenToSellingPlanFormRadioButtonChange();
	}
	listenToVariantChange() {
		this.listenToAddToCartForms();
		if (this.variantIdInput.tagName === 'INPUT') {
			const variantIdObserver = new MutationObserver((mutationList) => {
				mutationList.forEach((mutationRecord) => {
					this.handleVariantChange(mutationRecord.target.value);
				});
			});
			variantIdObserver.observe(this.variantIdInput, {
				attributes: true,
			});
		}
	}
	listenToAddToCartForms() {
		this.addToCartForms.forEach((addToCartForm) => {
			addToCartForm.addEventListener('change', () => {
				this.handleVariantChange();
			});
		});
	}
	get regularPriceElement() {
		return this.shopifySection.querySelector('.price__regular');
	}
	get salePriceElement() {
		return this.shopifySection?.querySelector('.price__sale');
	}
	get salePriceValue() {
		return this.salePriceElement?.querySelector('.price-item--sale');
	}
	get regularPriceValue() {
		return this.salePriceElement?.querySelector('.price-item--regular');
	}
	get sellingPlanAllocationPrice() {
		return document.getElementById(
			`${this.selectedPurchaseOption.dataset.sellingPlanGroupId}_allocation_price`,
		);
	}
	get selectedPurchaseOptionPrice() {
		return this.selectedPurchaseOption.dataset.variantPrice;
	}
	get selectedPurchaseOptionComparedAtPrice() {
		return this.selectedPurchaseOption.dataset.variantCompareAtPrice;
	}
	get price() {
		return this.sellingPlanAllocationPrices.price ?? null;
	}
	updatePrice() {
		if (
			!this.selectedPurchaseOptionComparedAtPrice || this.selectedPurchaseOptionComparedAtPrice === this.selectedPurchaseOptionPrice ) {
			this.showRegularPrice();
			this.hideSalePrice();
			this.priceElement?.classList.remove('price--on-sale');
		} else {
			this.showSalePrice();
			this.hideRegularPrice();
			this.priceElement?.classList.add('price--on-sale');
		}
	}

	hideSalePrice() {
		if (this.salePriceElement) {
			this.salePriceElement.style.display = 'none';
		}
	}
	hideRegularPrice() {
		if (this.regularPriceElement) {
			this.regularPriceElement.style.display = 'none';
		}
	}
	showRegularPrice() {
		if (this.regularPriceElement) {
			this.regularPriceElement.style.display = 'block';
		}
		const priceSale = this.shopifySection.querySelector('.price__sale');
		if (priceSale) {
			priceSale.style.display = 'none';
		}
	}
	showSalePrice() {
		if (this.salePriceElement) {
			this.salePriceElement.style.display = 'block';
			this.regularPriceValue.innerHTML =
				this.selectedPurchaseOptionComparedAtPrice;
			this.salePriceValue.innerHTML = this.selectedPurchaseOptionPrice;
		}
	}
	get sellingPlanInputs() {
		return this.shopifySection.querySelectorAll('.selected-selling-plan-id');
	}
	updateSellingPlanInputsValues() {
		this.sellingPlanInputs.forEach((sellingPlanInput) => {
			sellingPlanInput.value = this.sellingPlanInputValue;
		});
	}
	get sellingPlanInputValue() {
		return this.selectedPurchaseOption?.dataset.sellingPlanId ?? null;
	}
	get selectedPurchaseOption() {
		return this.visibleSellingPlanForm?.querySelector(
			'input[type="radio"]:checked',
		);
	}
	set selectedPurchaseOption(selectedPurchaseOption) {
		this._selectedPurchaseOption = selectedPurchaseOption;
	}
	handleRadioButtonChange(selectedPurchaseOption) {
		this.selectedPurchaseOption = selectedPurchaseOption;
		this.updateSellingPlanInputsValues();
		this.updatePrice();
	}
	listenToSellingPlanFormRadioButtonChange() {
		this.visibleSellingPlanForm
			?.querySelectorAll('input[type="radio"]')
			.forEach((radio) => {
				radio.addEventListener('change', (event) => {
					this.handleRadioButtonChange(event.target);
				});
			});
	}
	enablePerformanceObserver() {
		const performanceObserver = new PerformanceObserver((list) => {
			list.getEntries().forEach((entry) => {
				if (entry.initiatorType !== 'fetch') return;

				const url = new URL(entry.name);
				if (url.search.includes('variant') || url.search.includes('variants')) {
					this.updatePrice();
				}
			});
		});
		performanceObserver.observe({ entryTypes: ['resource'] });
	}
}
document
	.querySelectorAll('.selling_plan_app_container')
	.forEach((sellingPlansWidgetContainer) => {
		new SellingPlansWidget(sellingPlansWidgetContainer);
	});