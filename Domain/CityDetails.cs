using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain;

public class CityDetails
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public double CostOfFood { get; set; }
    public double TaxiCost { get; set; }
    public double ApartmentCost { get; set; }
    public double RentCost { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }
    
    [ForeignKey("City")]
    public required string CityId { get; set; }

    // nav property
    [JsonIgnore]
    public City City { get; set; } = null!;
}
