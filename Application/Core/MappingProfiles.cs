using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Cities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<City, City>();
            CreateMap<CreateCityDto, City>();
            CreateMap<EditCityDto, City>();
            CreateMap<CityDetails, CityDetails>();
            CreateMap<CreateCityDetailsDto, CityDetails>();
            CreateMap<EditCityDetailsDto, CityDetails>();
        }
    }
}