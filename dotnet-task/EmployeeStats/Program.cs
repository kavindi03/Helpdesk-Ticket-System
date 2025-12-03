using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

class Employee
{
    public string? EmployeeId { get; set; }
    public string? FullName { get; set; }
    public string? Department { get; set; }
}

class Program
{
    static void Main(string[] args)
    {
        string filePath = "employees.csv";

        if (!File.Exists(filePath))
        {
            Console.WriteLine("CSV file not found: " + filePath);
            return;
        }

        var lines = File.ReadAllLines(filePath)
                        .Where(line => !string.IsNullOrWhiteSpace(line))
                        .ToList();

        // Skip header
        lines.RemoveAt(0);

        List<Employee> employees = new List<Employee>();

        foreach (var line in lines)
        {
            var parts = line.Split(',');
            if (parts.Length < 3) continue;

            employees.Add(new Employee
            {
                EmployeeId = parts[0],
                FullName = parts[1],
                Department = parts[2]
            });
        }

        // Total employees
        Console.WriteLine($"Total Employees: {employees.Count}");

        // Employees by department
        var deptCounts = employees
            .GroupBy(e => e.Department)
            .Select(g => new { Department = g.Key, Count = g.Count() });

        Console.WriteLine("\nEmployees by Department:");

        foreach (var d in deptCounts)
        {
            Console.WriteLine($"{d.Department}: {d.Count}");
        }
    }
}
