using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cities.Commands
{
    public class EditCityDetails
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required EditCityDetailsDto DetailsDto { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var cityDetails = await context.CitiesDetails
                    .FirstAsync(x => x.Id == request.DetailsDto.Id, cancellationToken);

                if (cityDetails == null) return Result<Unit>.Failure("Details not found", 404);

                mapper.Map(request.DetailsDto, cityDetails);
                cityDetails.UpdateDate = DateTime.Now;

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to update details", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}