using System;

namespace Domain;

public class City
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required string Description { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }

    // nav property
    public CityDetails? Details { get; set; }
}
