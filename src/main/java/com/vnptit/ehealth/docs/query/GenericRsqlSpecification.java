package com.vnptit.ehealth.docs.query;

import cz.jirutka.rsql.parser.ast.ComparisonOperator;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;

import com.vnptit.ehealth.docs.model.DateCheckInfo;

import javax.persistence.criteria.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
public class GenericRsqlSpecification<T> implements Specification<T> {

    private String property;
    private ComparisonOperator operator;
    private List<String> arguments;

    @SneakyThrows
    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query,
                                 CriteriaBuilder builder) {
        Path<String> propertyExpression = parseProperty(root);
        List<Object> args = castArguments(propertyExpression);
        Object argument = args.get(0);
        switch (RsqlSearchOperation.getSimpleOperator(operator)) {
            case EQUAL:
                DateCheckInfo dateCheck = checkAndGetDate(argument);
                if (dateCheck.getIsDateFormat()) argument = dateCheck.getDate();

                if (argument instanceof String)
                    return builder.like(builder.lower(propertyExpression),
                            formatArgument(argument), '\\');
                else if (argument == null)
                    return builder.isNull(builder.lower(propertyExpression));
                else return builder.equal(builder.lower(propertyExpression), argument);


            case NOT_EQUAL:
                if (argument instanceof String)
                    return builder.notLike(propertyExpression,
                            argument.toString().replace('*', '%'));
                else if (argument == null)
                    return builder.isNotNull(propertyExpression);
                else return builder.notEqual(propertyExpression, argument);

            case GREATER_THAN:
                return builder.greaterThan(propertyExpression,
                        argument.toString());

            case GREATER_THAN_OR_EQUAL:
                return builder.greaterThanOrEqualTo(propertyExpression,
                        argument.toString());

            case LESS_THAN:
                return builder.lessThan(propertyExpression,
                        argument.toString());

            case LESS_THAN_OR_EQUAL:
                return builder.lessThanOrEqualTo(propertyExpression,
                        argument.toString());
            case IN:
                return propertyExpression.in(args);
            case NOT_IN:
                return builder.not(propertyExpression.in(args));
        }

        return null;
    }

    // This method will help us diving deep into nested property using the dot convention
    // The originial tutorial did not have this, so it can only parse the shallow properties.
    private Path<String> parseProperty(Root<T> root) {
        Path<String> path;
        if (property.contains(".")) {
            // Nested properties
            String[] pathSteps = property.split("\\.");
            String step = pathSteps[0];
            path = root.get(step);

            for (int i = 1; i <= pathSteps.length - 1; i++) {
                path = path.get(pathSteps[i]);
            }
        } else {
            path = root.get(property);
        }
        return path;
    }

    private String formatArgument(Object argument) throws ParseException {
        String result = argument.toString();
        String HIBERNATE_ESCAPE_CHAR = "\\";
        return result
                .toLowerCase()
                .replace("\\", HIBERNATE_ESCAPE_CHAR + "\\")
                .replace("_", HIBERNATE_ESCAPE_CHAR + "_")
                .replace("%", HIBERNATE_ESCAPE_CHAR + "%")
                .replace('*', '%');
    }

    private List<Object> castArguments(Path<?> propertyExpression) {
        Class<?> type = propertyExpression.getJavaType();

        return arguments.stream().map(arg -> {
            if (type.equals(Integer.class)) return Integer.parseInt(arg);
            else if (type.equals(Long.class)) return Long.parseLong(arg);
            else if (type.equals(Byte.class)) return Byte.parseByte(arg);
            else return arg;
        }).collect(Collectors.toList());
    }

    private DateCheckInfo checkAndGetDate(Object argument) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            return DateCheckInfo.builder()
                    .date(ZonedDateTime.ofInstant(formatter.parse(argument.toString()).toInstant(),
                            ZoneId.systemDefault()))
                    .isDateFormat(true)
                    .build();
        } catch (ParseException e) {
            return DateCheckInfo.builder()
                    .isDateFormat(false)
                    .build();
        }
    }
}
