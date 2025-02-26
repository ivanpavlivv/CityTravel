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
    public class EditCityDetails
    {
        public class Command : IRequest
        {
            public required EditCityDetailsDto DetailsDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var cityDetails = await context.CitiesDetails
                    .FirstAsync(x => x.Id == request.DetailsDto.Id, cancellationToken)
                    ?? throw new Exception("Details does not exist");

                mapper.Map(request.DetailsDto, cityDetails);

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}