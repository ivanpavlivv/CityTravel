using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Cities.Commands
{
    public class DeleteCityDetails
    {
        public class Command : IRequest
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var cityDetails = await context.CitiesDetails
                    .FirstAsync(x => x.Id == request.Id, cancellationToken)
                    ?? throw new Exception("Details does not exist");

                context.Remove(cityDetails);

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}