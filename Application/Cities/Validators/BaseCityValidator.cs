using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using FluentValidation;

namespace Application.Cities.Validators
{
    public class BaseCityValidator<T, TDto>
        : AbstractValidator<T> where TDto : BaseCityDto
    {
        public BaseCityValidator(Func<T, TDto> selector)
        {
            RuleFor(x => selector(x).Name).NotEmpty().WithMessage("Name is required")
                .MaximumLength(100).WithMessage("Name must not exceed 100 characters");
            RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is required");
            RuleFor(x => selector(x).Latitude).NotEmpty().WithMessage("Latitude is required").InclusiveBetween(-90, 90).WithMessage("Latitude must be within -90 and 90");
            RuleFor(x => selector(x).Longitude).NotEmpty().WithMessage("Longitude is required").InclusiveBetween(-180, 180).WithMessage("Longitude must be within -180 and 180");

        }
    }
}