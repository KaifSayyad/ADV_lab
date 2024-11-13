
// document.addEventListener('DOMContentLoaded', function() {
//     // Load dataset from the CSV file named "test.csv"
//     d3.csv("test.csv").then(function(data) {
//         // Process CSV data
//         data.forEach(d => {
//             d.age = +d.age; // Convert age to a number
//             d.balance = +d.balance; // Convert balance to a number
//             d.duration = +d.duration; // Convert duration to a number
//         });

//         // Visualization 1: Age distribution bar chart
//         createAgeDistributionChart(data, "#vis1");

//         // Visualization 2: Job type pie chart
//         createJobTypePieChart(data, "#vis2");

//         // Visualization 3: Marital status bar chart
//         createMaritalStatusChart(data, "#vis3");

//         // Visualization 4: Education level pie chart
//         createEducationPieChart(data, "#vis4");

//         // Visualization 5: Balance histogram
//         createBalanceHistogram(data, "#vis5");
//     });
// });

// // Helper function to create a tooltip
// function createTooltip() {
//     return d3.select('body').append('div')
//         .attr('class', 'tooltip')
//         .style('position', 'absolute')
//         .style('background-color', 'white')
//         .style('border', '1px solid #ccc')
//         .style('padding', '5px')
//         .style('border-radius', '5px')
//         .style('pointer-events', 'none')
//         .style('opacity', 0);
// }

// // Visualization 1: Age distribution bar chart with labels and hover effect
// function createAgeDistributionChart(data, selector) {
//     const width = 1200, height = 700, margin = 60;
//     const svg = d3.select(selector)
//         .append('svg')
//         .attr('width', width)
//         .attr('height', height);

//     const tooltip = createTooltip();

//     const ageCounts = d3.rollup(data, v => v.length, d => d.age);
//     const x = d3.scaleBand()
//         .domain(Array.from(ageCounts.keys()).sort((a, b) => a - b))
//         .range([margin, width - margin])
//         .padding(0.1);

//     const y = d3.scaleLinear()
//         .domain([0, d3.max(Array.from(ageCounts.values()))])
//         .range([height - margin, margin]);

//     // Axes labels
//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", height - 10)
//         .attr("text-anchor", "middle")
//         .text("Age");

//     svg.append("text")
//         .attr("x", -height / 2)
//         .attr("y", 20)
//         .attr("transform", "rotate(-90)")
//         .attr("text-anchor", "middle")
//         .text("Count");

//     // Bars
//     svg.append('g')
//         .selectAll('rect')
//         .data(Array.from(ageCounts))
//         .enter()
//         .append('rect')
//         .attr('x', d => x(d[0]))
//         .attr('y', d => y(d[1]))
//         .attr('width', x.bandwidth())
//         .attr('height', d => height - margin - y(d[1]))
//         .attr('fill', '#69b3a2')
//         .on('mouseover', (event, d) => {
//             d3.select(event.currentTarget).attr('fill', '#ff6f61');
//             tooltip.style('opacity', 1)
//                    .html(`Age: ${d[0]}<br>Count: ${d[1]}`);
//         })
//         .on('mousemove', (event) => {
//             tooltip.style('left', (event.pageX + 10) + 'px')
//                    .style('top', (event.pageY - 20) + 'px');
//         })
//         .on('mouseout', (event) => {
//             d3.select(event.currentTarget).attr('fill', '#69b3a2');
//             tooltip.style('opacity', 0);
//         });

//     // Axes
//     svg.append('g')
//         .attr('transform', `translate(0,${height - margin})`)
//         .call(d3.axisBottom(x).tickFormat(d3.format("d")));

//     svg.append('g')
//         .attr('transform', `translate(${margin},0)`)
//         .call(d3.axisLeft(y));
// }

// // Visualization 2: Job type pie chart with labels and hover effect
// function createJobTypePieChart(data, selector) {
//     const width = 800, height = 800, radius = Math.min(width, height) / 2 - 10;
//     const svg = d3.select(selector)
//         .append('svg')
//         .attr('width', width)
//         .attr('height', height)
//         .append('g')
//         .attr('transform', `translate(${width / 2}, ${height / 2})`);

//     const tooltip = createTooltip();

//     const jobCounts = d3.rollup(data, v => v.length, d => d.job);
//     const pie = d3.pie().value(d => d[1]);
//     const arc = d3.arc().innerRadius(0).outerRadius(radius);
//     const color = d3.scaleOrdinal(d3.schemeCategory10);

//     const arcs = svg.selectAll('path')
//         .data(pie(Array.from(jobCounts)))
//         .enter()
//         .append('path')
//         .attr('d', arc)
//         .attr('fill', d => color(d.data[0]))
//         .on('mouseover', (event, d) => {
//             d3.select(event.currentTarget).attr('stroke', '#333').attr('stroke-width', 2);
//             tooltip.style('opacity', 1)
//                    .html(`Job: ${d.data[0]}<br>Count: ${d.data[1]}`);
//         })
//         .on('mousemove', (event) => {
//             tooltip.style('left', (event.pageX + 10) + 'px')
//                    .style('top', (event.pageY - 20) + 'px');
//         })
//         .on('mouseout', (event) => {
//             d3.select(event.currentTarget).attr('stroke', 'none');
//             tooltip.style('opacity', 0);
//         });

//     // Labels
//     svg.selectAll('text')
//         .data(pie(Array.from(jobCounts)))
//         .enter()
//         .append('text')
//         .attr('transform', d => `translate(${arc.centroid(d)})`)
//         .attr('dy', '0.35em')
//         .attr('text-anchor', 'middle')
//         .style('font-size', '15px')
//         .style('fill', '#fff')
//         .text(d => d.data[0]);
// }

// // Visualization 3: Marital status bar chart with hover effect and labels
// function createMaritalStatusChart(data, selector) {
//     const width = 1100, height = 600, margin = 60;
//     const svg = d3.select(selector)
//         .append('svg')
//         .attr('width', width)
//         .attr('height', height);

//     const tooltip = createTooltip();

//     const maritalCounts = d3.rollup(data, v => v.length, d => d.marital);
//     const x = d3.scaleBand()
//         .domain(Array.from(maritalCounts.keys()))
//         .range([margin, width - margin])
//         .padding(0.1);

//     const y = d3.scaleLinear()
//         .domain([0, d3.max(Array.from(maritalCounts.values()))])
//         .range([height - margin, margin]);

//     // Axes labels
//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", height - 10)
//         .attr("text-anchor", "middle")
//         .text("Marital Status");

//     svg.append("text")
//         .attr("x", -height / 2)
//         .attr("y", 20)
//         .attr("transform", "rotate(-90)")
//         .attr("text-anchor", "middle")
//         .text("Count");

//     // Bars with hover interaction
//     svg.append('g')
//         .selectAll('rect')
//         .data(Array.from(maritalCounts))
//         .enter()
//         .append('rect')
//         .attr('x', d => x(d[0]))
//         .attr('y', d => y(d[1]))
//         .attr('width', x.bandwidth())
//         .attr('height', d => height - margin - y(d[1]))
//         .attr('fill', '#ffab00')
//         .on('mouseover', (event, d) => {
//             d3.select(event.currentTarget).attr('fill', '#ff6f61');
//             tooltip.style('opacity', 1)
//                    .html(`Status: ${d[0]}<br>Count: ${d[1]}`);
//         })
//         .on('mousemove', (event) => {
//             tooltip.style('left', (event.pageX + 10) + 'px')
//                    .style('top', (event.pageY - 20) + 'px');
//         })
//         .on('mouseout', (event) => {
//             d3.select(event.currentTarget).attr('fill', '#ffab00');
//             tooltip.style('opacity', 0);
//         });

//     // Axes
//     svg.append('g')
//         .attr('transform', `translate(0,${height - margin})`)
//         .call(d3.axisBottom(x));

//     svg.append('g')
//         .attr('transform', `translate(${margin},0)`)
//         .call(d3.axisLeft(y));
// }

// // Visualization 4: Education level pie chart with labels and hover effect
// function createEducationPieChart(data, selector) {
//     const width = 800, height = 800, radius = Math.min(width, height) / 2 - 10;
//     const svg = d3.select(selector)
//         .append('svg')
//         .attr('width', width)
//         .attr('height', height)
//         .append('g')
//         .attr('transform', `translate(${width / 2}, ${height / 2})`);

//     const tooltip = createTooltip();

//     const educationCounts = d3.rollup(data, v => v.length, d => d.education);
//     const pie = d3.pie().value(d => d[1]);
//     const arc = d3.arc().innerRadius(0).outerRadius(radius);
//     const color = d3.scaleOrdinal(d3.schemeCategory10);

//     const arcs = svg.selectAll('path')
//         .data(pie(Array.from(educationCounts)))
//         .enter()
//         .append('path')
//         .attr('d', arc)
//         .attr('fill', d => color(d.data[0]))
//         .on('mouseover', (event, d) => {
//             d3.select(event.currentTarget).attr('stroke', '#333').attr('stroke-width', 2);
//             tooltip.style('opacity', 1)
//                    .html(`Education: ${d.data[0]}<br>Count: ${d.data[1]}`);
//         })
//         .on('mousemove', (event) => {
//             tooltip.style('left', (event.pageX + 10) + 'px')
//                    .style('top', (event.pageY - 20) + 'px');
//         })
//         .on('mouseout', (event) => {
//             d3.select(event.currentTarget).attr('stroke', 'none');
//             tooltip.style('opacity', 0);
//         });

//     // Labels
//     svg.selectAll('text')
//         .data(pie(Array.from(educationCounts)))
//         .enter()
//         .append('text')
//         .attr('transform', d => `translate(${arc.centroid(d)})`)
//         .attr('dy', '0.35em')
//         .attr('text-anchor', 'middle')
//         .style('font-size', '15px')
//         .style('fill', '#fff')
//         .text(d => d.data[0]);
// }

// // Visualization 5: Balance histogram with hover effect and labels
// function createBalanceHistogram(data, selector) {
//     const width = 1100, height = 600, margin = 60;
//     const svg = d3.select(selector)
//         .append('svg')
//         .attr('width', width)
//         .attr('height', height);

//     const tooltip = createTooltip();

//     const x = d3.scaleLinear()
//         .domain(d3.extent(data, d => d.balance))
//         .nice()
//         .range([margin, width - margin]);

//     const histogram = d3.histogram()
//         .value(d => d.balance)
//         .domain(x.domain())
//         .thresholds(x.ticks(20));

//     const bins = histogram(data);
//     const y = d3.scaleLinear()
//         .domain([0, d3.max(bins, d => d.length)])
//         .nice()
//         .range([height - margin, margin]);

//     // Axes labels
//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", height - 10)
//         .attr("text-anchor", "middle")
//         .text("Account Balance");

//     svg.append("text")
//         .attr("x", -height / 2)
//         .attr("y", 20)
//         .attr("transform", "rotate(-90)")
//         .attr("text-anchor", "middle")
//         .text("Count");

//     // Bars with hover interaction
//     svg.append('g')
//         .selectAll('rect')
//         .data(bins)
//         .enter()
//         .append('rect')
//         .attr('x', d => x(d.x0))
//         .attr('y', d => y(d.length))
//         .attr('width', d => x(d.x1) - x(d.x0) - 1)
//         .attr('height', d => height - margin - y(d.length))
//         .attr('fill', '#4c78a8')
//         .on('mouseover', (event, d) => {
//             d3.select(event.currentTarget).attr('fill', '#ff6f61');
//             tooltip.style('opacity', 1)
//                    .html(`Range: ${d.x0} - ${d.x1}<br>Count: ${d.length}`);
//         })
//         .on('mousemove', (event) => {
//             tooltip.style('left', (event.pageX + 10) + 'px')
//                    .style('top', (event.pageY - 20) + 'px');
//         })
//         .on('mouseout', (event) => {
//             d3.select(event.currentTarget).attr('fill', '#4c78a8');
//             tooltip.style('opacity', 0);
//         });

//     // Axes
//     svg.append('g')
//         .attr('transform', `translate(0,${height - margin})`)
//         .call(d3.axisBottom(x));

//     svg.append('g')
//         .attr('transform', `translate(${margin},0)`)
//         .call(d3.axisLeft(y));
// }



document.addEventListener('DOMContentLoaded', function() {
    d3.csv("test.csv").then(function(data) {
        data.forEach(d => {
            d.age = +d.age;
            d.balance = +d.balance;
            d.duration = +d.duration;
        });

        createAgeDistributionChart(data, "#vis1");
        createJobTypeDonutChart(data, "#vis2");
        createMaritalStatusGroupedBarChart(data, "#vis3");
        createEducationDonutChart(data, "#vis4");
        createBalanceDensityPlot(data, "#vis5");
    });
});

function createTooltip() {
    return d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
}

// Advanced Visualization 1: Age Distribution Bar Chart with Enhanced Tooltips and Axis Labels
function createAgeDistributionChart(data, selector) {
    const width = 1100, height = 800, margin = { top: 40, right: 20, bottom: 50, left: 60 };
    const svg = d3.select(selector).append("svg")
        .attr("width", width)
        .attr("height", height);

    const tooltip = createTooltip();
    const ageCounts = d3.rollup(data, v => v.length, d => d.age);
    const x = d3.scaleBand().domain(Array.from(ageCounts.keys()).sort((a, b) => a - b))
        .range([margin.left, width - margin.right]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(Array.from(ageCounts.values()))]).nice()
        .range([height - margin.bottom, margin.top]);

    svg.append("g").selectAll("rect").data(Array.from(ageCounts)).enter().append("rect")
        .attr("x", d => x(d[0]))
        .attr("y", d => y(d[1]))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d[1]))
        .attr("fill", "#69b3a2")
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("fill", "#ff6f61");
            tooltip.style("opacity", 1).html(`Age: ${d[0]}<br>Count: ${d[1]}`);
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 10) + "px").style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", (event) => {
            d3.select(event.currentTarget).attr("fill", "#69b3a2");
            tooltip.style("opacity", 0);
        });

    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x));
    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

    svg.append("text").attr("x", width / 2).attr("y", height - margin.bottom / 3)
        .attr("text-anchor", "middle").text("Age");

    svg.append("text").attr("x", -height / 2).attr("y", margin.left / 3)
        .attr("transform", "rotate(-90)").attr("text-anchor", "middle").text("Count");
}

// Advanced Visualization 2: Job Type Donut Chart with Legends
function createJobTypeDonutChart(data, selector) {
    const width = 800, height = 800, radius = Math.min(width, height) / 2 - 10;
    const svg = d3.select(selector).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const tooltip = createTooltip();
    const jobCounts = d3.rollup(data, v => v.length, d => d.job);
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().value(d => d[1]);
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius);

    svg.selectAll("path").data(pie(Array.from(jobCounts))).enter().append("path")
        .attr("d", arc).attr("fill", d => color(d.data[0]))
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1).html(`Job: ${d.data[0]}<br>Count: ${d.data[1]}`);
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 10) + "px").style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));
}

// Advanced Visualization 3: Marital Status Grouped Bar Chart
function createMaritalStatusGroupedBarChart(data, selector) {
    const width = 1100, height = 800, margin = { top: 40, right: 20, bottom: 60, left: 60 };
    const svg = d3.select(selector).append("svg")
        .attr("width", width)
        .attr("height", height);

    const tooltip = createTooltip();

    // Group data by age and marital status, counting occurrences
    const ageMaritalCounts = d3.rollup(data, v => v.length, d => d.age, d => d.marital);
    const ages = Array.from(ageMaritalCounts.keys()).sort((a, b) => a - b);
    const maritalStatuses = Array.from(new Set(data.map(d => d.marital)));

    // Scales
    const x0 = d3.scaleBand().domain(ages).range([margin.left, width - margin.right]).padding(0.2);
    const x1 = d3.scaleBand().domain(maritalStatuses).range([0, x0.bandwidth()]).padding(0.05);
    const y = d3.scaleLinear().domain([0, d3.max(Array.from(ageMaritalCounts.values(), v => d3.max(Array.from(v.values()))))]).nice()
        .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal(d3.schemeSet2).domain(maritalStatuses);

    // Bars
    svg.append("g").selectAll("g")
        .data(ages)
        .enter().append("g")
        .attr("transform", d => `translate(${x0(d)},0)`)
        .selectAll("rect")
        .data(d => maritalStatuses.map(marital => ({ age: d, marital: marital, count: ageMaritalCounts.get(d)?.get(marital) || 0 })))
        .enter().append("rect")
        .attr("x", d => x1(d.marital))
        .attr("y", d => y(d.count))
        .attr("width", x1.bandwidth())
        .attr("height", d => y(0) - y(d.count))
        .attr("fill", d => color(d.marital))
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("fill", d3.rgb(color(d.marital)).darker(1));
            tooltip.style("opacity", 1).html(`Age: ${d.age}<br>Marital Status: ${d.marital}<br>Count: ${d.count}`);
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 10) + "px").style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", (event, d) => {
            d3.select(event.currentTarget).attr("fill", color(d.marital));
            tooltip.style("opacity", 0);
        });

    // Axes
    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .attr("dy", "0.35em")
        .attr("dx", "-0.6em")
        .style("text-anchor", "end");

    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

    // Labels
    svg.append("text").attr("x", width / 2).attr("y", height - margin.bottom / 2)
        .attr("text-anchor", "middle").text("Age");

    svg.append("text").attr("x", -height / 2).attr("y", margin.left / 3)
        .attr("transform", "rotate(-90)").attr("text-anchor", "middle").text("Count");

    // Legend
    const legend = svg.append("g").attr("transform", `translate(${width - margin.right - 120},${margin.top})`);
    maritalStatuses.forEach((status, i) => {
        legend.append("rect")
            .attr("x", 0).attr("y", i * 20)
            .attr("width", 15).attr("height", 15)
            .attr("fill", color(status));
        
        legend.append("text")
            .attr("x", 20).attr("y", i * 20 + 12)
            .text(status)
            .style("font-size", "18px")
            .attr("alignment-baseline", "middle");
    });
}


// Advanced Visualization 4: Education Donut Chart
function createEducationDonutChart(data, selector) {
    const width = 800, height = 800, margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(selector).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const tooltip = createTooltip();

    // Data preparation: Group and count by education level
    const educationCounts = d3.rollup(data, v => v.length, d => d.education);
    const educationData = Array.from(educationCounts, ([education, count]) => ({ education, count }));

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeSet3).domain(educationData.map(d => d.education));

    // Pie generator and arc settings
    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius);
    const arcLabel = d3.arc().innerRadius(radius * 0.75).outerRadius(radius * 0.75);

    // Donut segments
    svg.selectAll("path")
        .data(pie(educationData))
        .enter().append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.education))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
            d3.select(event.currentTarget).attr("fill", d3.rgb(color(d.data.education)).darker(0.8));
            tooltip.style("opacity", 1).html(`Education: ${d.data.education}<br>Count: ${d.data.count}`);
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 10) + "px").style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", (event, d) => {
            d3.select(event.currentTarget).attr("fill", color(d.data.education));
            tooltip.style("opacity", 0);
        });

    // Labels
    svg.selectAll("text")
        .data(pie(educationData))
        .enter().append("text")
        .text(d => d.data.education)
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "18px");

    // Title
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("y", -height / 2 + margin)
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text("Education Level Distribution");
}


// Advanced Visualization 5: Balance Density Plot
function createBalanceDensityPlot(data, selector) {
    const width = 1100, height = 800, margin = { top: 20, right: 30, bottom: 50, left: 60 };

    // Append the SVG object to the selector
    const svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const tooltip = createTooltip();

    // Data preprocessing: Filter to ensure valid balance data
    const balanceData = data.map(d => d.balance).filter(balance => !isNaN(balance));

    // Define x scale (for balance values) and y scale (for density values)
    const x = d3.scaleLinear()
        .domain(d3.extent(balanceData)).nice()
        .range([0, width]);

    // KDE (Kernel Density Estimation) function to compute density values
    function kernelDensityEstimator(kernel, X) {
        return function(V) {
            return X.map(x => [x, d3.mean(V, v => kernel(x - v))]);
        };
    }

    // Kernel function (Gaussian)
    function kernelGaussian(k) {
        return v => (1 / (Math.sqrt(2 * Math.PI) * k)) * Math.exp(-0.5 * (v / k) ** 2);
    }

    // Compute the density data
    const kde = kernelDensityEstimator(kernelGaussian(200), x.ticks(100));
    const density = kde(balanceData);

    // Define y scale for density
    const y = d3.scaleLinear()
        .domain([0, d3.max(density, d => d[1])]).nice()
        .range([height, 0]);

    // Add x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .append("text")
        .attr("x", width / 2)
        .attr("y", 40)
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Account Balance");

    // Add y-axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("transform", "rotate(-90)")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .text("Density");

    // Draw the density curve
    svg.append("path")
        .datum(density)
        .attr("fill", "#69b3a2")
        .attr("opacity", 0.6)
        .attr("stroke", "#377eb8")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.line()
            .curve(d3.curveBasis)
            .x(d => x(d[0]))
            .y(d => y(d[1]))
        );

    // Add tooltip interaction for density curve
    svg.selectAll("circle")
        .data(density)
        .enter().append("circle")
        .attr("cx", d => x(d[0]))
        .attr("cy", d => y(d[1]))
        .attr("r", 2)
        .style("fill", "transparent")
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1)
                   .html(`Balance: ${d[0].toFixed(2)}<br>Density: ${d[1].toFixed(4)}`);
        })
        .on("mousemove", (event) => {
            tooltip.style("left", (event.pageX + 10) + "px")
                   .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });

    // Add title to the plot
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text("Balance Density Plot");
}
