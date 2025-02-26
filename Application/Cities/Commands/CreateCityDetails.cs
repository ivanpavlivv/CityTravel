using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cities.Commands
{
    public class CreateCityDetails
    {
        public class Command : IRequest<string>
        {
            public required CreateCityDetailsDto DetailsDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var city = context.Cities.Include(x => x.Details).First(x => x.Id == request.DetailsDto.CityId)
                    ?? throw new Exception("City details provided with nonexistent city");

                if (city.Details != null)
                {
                    throw new Exception("Details for this city already exist");
                }

                var details = mapper.Map<CityDetails>(request.DetailsDto);

                city.Details = details;

                await context.CitiesDetails.AddAsync(details, cancellationToken);

                await context.SaveChangesAsync(cancellationToken);

                return details.Id;
            }
        }
    }
}