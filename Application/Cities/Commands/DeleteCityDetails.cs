using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cities.Commands
{
    public class DeleteCityDetails
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var cityDetails = await context.CitiesDetails
                    .FirstAsync(x => x.Id == request.Id, cancellationToken);

                if (cityDetails == null) return Result<Unit>.Failure("Details not found", 404);

                context.Remove(cityDetails);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete details", 400);

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}