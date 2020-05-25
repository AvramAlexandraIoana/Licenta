using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebFMI.Models;

namespace WebFMI.Data
{
    public interface IBankingRepository<T> where T : class
    {
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<T> SaveAsync(T entity);

    }
}
