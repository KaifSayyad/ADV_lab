# Linear Regression
model <- lm(price ~ area + bedrooms + bathrooms + stories + mainroad + guestroom + basement + hotwaterheating + airconditioning + parking + prefarea + furnishingstatus, data=Housing)
summary(model)
plot(Housing$area, Housing$price, main="Price vs Area", 
     xlab="Area", ylab="Price", pch=19, col="blue")
abline(lm(price ~ area, data=Housing), col="red", lwd=2)


# Logistic Regression
median_price <- median(Housing$price)
Housing$price_category <- ifelse(Housing$price > median_price, 1, 0)
logistic_model <- glm(price_category ~ area + bedrooms + bathrooms + stories + mainroad + guestroom + basement + hotwaterheating + airconditioning + parking + prefarea + furnishingstatus, 
                      data = Housing, family = binomial)
predicted_probabilities <- predict(logistic_model, type = "response")
Housing$predicted_probabilities <- predicted_probabilities

library(ggplot2)
ggplot(Housing, aes(x=area, y=price_category, color=factor(price_category))) +
  geom_point(alpha=0.4, size=2) + 
  stat_smooth(method="glm", method.args=list(family="binomial"), se=FALSE, color="blue", lwd=1.2) + 
  labs(title="Logistic Regression: Sigmoid Curve", x="Area", y="Price Category (0=Cheap, 1=Expensive)") +
  scale_color_manual(values = c("blue", "red"), name = "Price Category", labels = c("Cheap", "Expensive")) +
  theme_minimal()


# WordCloud

library(wordcloud)
library(RColorBrewer)

furnishingstatus_text <- as.character(Housing$furnishingstatus)
furnishingstatus_table <- table(furnishingstatus_text)
wordcloud(names(furnishingstatus_table), furnishingstatus_table, 
          colors = brewer.pal(8, "Dark2"), scale = c(3,0.5),
          random.order = FALSE)

# Box plot of price by furnishing status
ggplot(Housing, aes(x = factor(furnishingstatus), y = price)) +
  geom_boxplot() +
  labs(title = "Boxplot of House Prices by Furnishing Status", x = "Furnishing Status", y = "Price") +
  theme_minimal()



# Violin plot of price by furnishing status
ggplot(Housing, aes(x = factor(furnishingstatus), y = price, fill = factor(furnishingstatus))) +
  geom_violin(trim = FALSE) +
  labs(title = "Violin Plot of House Prices by Furnishing Status", x = "Furnishing Status", y = "Price") +
  theme_minimal()


# Load the library
library(plotly)

# 3D Scatter plot of area, bedrooms, and price
plot_ly(Housing, x = ~area, y = ~bedrooms, z = ~price, color = ~price, 
        type = 'scatter3d', mode = 'markers') %>%
  layout(title = '3D Scatter Plot of Area, Bedrooms, and Price')


# Jitter plot of bedrooms vs price
ggplot(Housing, aes(x = factor(bedrooms), y = price)) +
  geom_jitter(width = 0.2, height = 0) +
  labs(title = "Jitter Plot of Bedrooms vs Price", x = "Number of Bedrooms", y = "Price") +
  theme_minimal()

