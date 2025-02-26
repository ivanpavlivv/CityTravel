using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Cities.Commands
{
    public class DeleteCityAndDetails
    {
        public class Command : IRequest
        {
            public required string Id { get; set; }
        }

        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var city = await context.Cities.FindAsync([request.Id], cancellationToken) 
                    ?? throw new Exception("City does not exist");

                context.Remove(city);

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}