using CarSales.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSales.Data
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Make>().HasData(
                new Make { MakeID = 1, Name = "Holden" },
                new Make { MakeID = 2, Name = "Ford" },
                new Make { MakeID = 3, Name = "Kia" },
                new Make { MakeID = 4, Name = "Honda" }
            );

            modelBuilder.Entity<VehicleType>().HasData(

                new VehicleType { VehicleTypeID = 1, Name = "Car" },
                new VehicleType { VehicleTypeID = 2, Name = "Boat"},
                new VehicleType { VehicleTypeID = 3, Name = "Bike"}
            );

            modelBuilder.Entity<VehicleTypeMake>().HasData(

                new VehicleTypeMake { MakeID = 1, VehicleTypeID = 1 },
                new VehicleTypeMake { MakeID = 2, VehicleTypeID = 1 },
                new VehicleTypeMake { MakeID = 3, VehicleTypeID = 1 },
                new VehicleTypeMake { MakeID = 4, VehicleTypeID = 1 }

            );



            modelBuilder.Entity<BodyType>().HasData(
                new BodyType { BodyTypeID = 1, Name = "Sedan" },
                new BodyType { BodyTypeID = 2, Name = "Hatch" },
                new BodyType { BodyTypeID = 3, Name = "4WD" },
                new BodyType { BodyTypeID = 4, Name = "Coupe" }
            );
            modelBuilder.Entity<Model>().HasData(
               new Model
               {
                   ModelID = 1,
                   Name = "Commodore",
                   VehicleTypeID = 1,
                   MakeID = 1,
               },
                new Model
                {
                    ModelID = 2,
                    Name = "Astra",
                    VehicleTypeID = 1,
                    MakeID = 1
                },
                new Model
                {
                    ModelID = 3,
                    Name = "Falcon",
                    VehicleTypeID = 1,
                    MakeID = 2
                },
                new Model
                {
                    ModelID = 4,
                    Name = "Territory",
                    VehicleTypeID = 1,
                    MakeID = 2
                },
                new Model
                {
                    ModelID = 5,
                    Name = "Cerato",
                    VehicleTypeID = 1,
                    MakeID = 3
                },
                new Model
                {
                    ModelID = 6,
                    Name = "Seltos",
                    VehicleTypeID = 1,
                    MakeID = 3
                },
                new Model
                {
                    ModelID = 7,
                    Name = "Accord",
                    VehicleTypeID = 1,
                    MakeID = 4
                }
            );
            modelBuilder.Entity<Car>().HasData(
                new Car
                {
                    ID = 1,
                    Created = DateTime.Parse("2007-09-01"),
                    BodyTypeID = 1,
                    ModelID = 1,
                    Doors = 4
                },
                new Car
                {
                    ID = 2,
                    Created = DateTime.Parse("2007-09-01"),
                    BodyTypeID = 3,
                    ModelID = 4,
                    Doors = 5
                },
                new Car
                {
                    ID = 3,
                    Created = DateTime.Parse("2007-09-01"),
                    BodyTypeID = 2,
                    ModelID = 2,
                    Doors = 4
                },
                new Car
                {
                    ID = 4,
                    Created = DateTime.Parse("2007-09-01"),
                    BodyTypeID = 1,
                    ModelID = 6,
                    Doors = 4
                }
            );


        }
    }
}
