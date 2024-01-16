using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace HealthcareSystem.Backend.Data
{
    public class AuthContext : IdentityDbContext
    {
        public AuthContext(DbContextOptions<AuthContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            var userRoleId = "26cc9c0b910c6040dc750af98a95aea5f49be126b0b60d77b8dcd274564dc2e4";
            var normalStaffRoleId = "2d6f5aca160d2a7818d4b217f43aa41a1e32e9df58da97323f0b9923bd043ca2";
            var adminRoleId = "a298a2bb22a23883b1a5db7939f233c0e8f5f813adfd2c9889d44cc6a45e5b37";
            var customerCareStaffRoleId = "c988a78dc5639b5dfd7c4dfd60400edaa22561a2676729149e49b19d2c8466ad";
            var accountantRoleId = "b1cdd14b306372a94d9ce88b44eb12790f6e153cbeb28e39e6edecb152ec5dd8";
            var testingRoleId = "8c40537d8c41574967302176d24e9588bd74e078b1a858c36a4a5e499f18215b";
            var roles = new List<IdentityRole>() {

            new IdentityRole(){
                    Id= userRoleId,
                    ConcurrencyStamp = userRoleId,
                    Name = "User",
                    NormalizedName = "User".ToUpper()
            },

            new IdentityRole(){
                    Id= normalStaffRoleId,
                    ConcurrencyStamp = normalStaffRoleId,
                    Name = "Normal Staff",
                    NormalizedName = "Normal Staff".ToUpper()
            },
            new IdentityRole(){
                    Id= adminRoleId,
                    ConcurrencyStamp = adminRoleId,
                    Name = "Admin",
                    NormalizedName = "Admin".ToUpper()
            },
            new IdentityRole(){
                    Id= customerCareStaffRoleId,
                    ConcurrencyStamp = customerCareStaffRoleId,
                    Name = "Customer Care Staff",
                    NormalizedName = "Customer Care Staff".ToUpper()
            },
            new IdentityRole(){
                    Id= accountantRoleId,
                    ConcurrencyStamp = accountantRoleId,
                    Name = "Accountant",
                    NormalizedName = "Accountant".ToUpper()
            },
            new IdentityRole(){
                    Id= testingRoleId,
                    ConcurrencyStamp = testingRoleId,
                    Name = "Test",
                    NormalizedName = "Test".ToUpper()
            },

        };
            builder.Entity<IdentityRole>().HasData(roles);

        }
    }
}
