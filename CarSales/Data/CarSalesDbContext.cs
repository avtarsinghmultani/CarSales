using CarSales.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSales.Data
{
    public class CarSalesDbContext : DbContext
    {
        public CarSalesDbContext(DbContextOptions<CarSalesDbContext> options) : base(options)
        {

        }

        public DbSet<VehicleType> VehicleTypes { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<BodyType> BodyTypes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Car> Cars{ get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Make>().HasMany(s => s.Models).WithOne(s => s.Make);
            modelBuilder.Entity<VehicleType>().HasMany(s => s.Models).WithOne(s => s.VehicleType);
            modelBuilder.Entity<Model>().HasMany(m => m.Cars).WithOne(c => c.Model);

            modelBuilder.Entity<VehicleTypeMake>()
                .HasKey(vm => new { vm.VehicleTypeID, vm.MakeID });

            modelBuilder.Entity<VehicleTypeMake>()
                .HasOne(vm => vm.VehicleType)
                .WithMany(v => v.VehicleTypeMakes)
                .HasForeignKey(vm => vm.VehicleTypeID);

            modelBuilder.Entity<VehicleTypeMake>()
                .HasOne(vm => vm.Make)
                .WithMany(m => m.VehicleTypeMakes)
                .HasForeignKey(vm => vm.MakeID);

            //Seeds data to the tables after table creation.
            modelBuilder.Seed();


        }
    }
}
