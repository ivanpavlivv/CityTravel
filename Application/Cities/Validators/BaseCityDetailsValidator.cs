using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using FluentValidation;

namespace Application.Cities.Validators
{
    public class BaseCityDetailsValidator<T, TDto> 
        : AbstractValidator<T> where TDto : BaseCityDetailsDto
    {
        public BaseCityDetailsValidator(Func<T, TDto> selector)
        {
            RuleFor(x => selector(x).CostOfFood).NotEmpty().WithMessage("Cost of food is required");
            RuleFor(x => selector(x).TaxiCost).NotEmpty().WithMessage("Taxi cost is required");
            RuleFor(x => selector(x).ApartmentCost).NotEmpty().WithMessage("Apartment cost is required");
            RuleFor(x => selector(x).RentCost).NotEmpty().WithMessage("Rent cost is required");
        }
    }
}