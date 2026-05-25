"use client";

import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButtonProps,
  type Locale
} from "react-day-picker";

import { cn } from "../utilities";
import { Button, type ButtonIntent } from "./button";
import { Icon } from "./icon";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: ButtonIntent;
};

export function Calendar({
  buttonVariant = "quiet",
  captionLayout = "label",
  className,
  classNames,
  components,
  formatters,
  locale,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      captionLayout={captionLayout}
      className={cn("pds-calendar", className)}
      classNames={{
        root: cn("pds-calendar-root", defaultClassNames.root),
        months: cn("pds-calendar-months", defaultClassNames.months),
        month: cn("pds-calendar-month", defaultClassNames.month),
        nav: cn("pds-calendar-nav", defaultClassNames.nav),
        button_previous: cn(
          "pds-calendar-nav-button pds-calendar-nav-button-previous",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "pds-calendar-nav-button pds-calendar-nav-button-next",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "pds-calendar-month-caption",
          defaultClassNames.month_caption
        ),
        dropdowns: cn("pds-calendar-dropdowns", defaultClassNames.dropdowns),
        dropdown_root: cn(
          "pds-calendar-dropdown-root",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("pds-calendar-dropdown", defaultClassNames.dropdown),
        caption_label: cn(
          captionLayout === "label"
            ? "pds-calendar-caption"
            : "pds-calendar-caption pds-calendar-caption-dropdown",
          defaultClassNames.caption_label
        ),
        month_grid: cn("pds-calendar-table", defaultClassNames.month_grid),
        weekdays: cn("pds-calendar-weekdays", defaultClassNames.weekdays),
        weekday: cn("pds-calendar-weekday", defaultClassNames.weekday),
        week: cn("pds-calendar-week", defaultClassNames.week),
        week_number_header: cn(
          "pds-calendar-week-number-header",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "pds-calendar-week-number",
          defaultClassNames.week_number
        ),
        day: cn("pds-calendar-day", defaultClassNames.day),
        range_start: cn(
          "pds-calendar-range-start",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "pds-calendar-range-middle",
          defaultClassNames.range_middle
        ),
        range_end: cn("pds-calendar-range-end", defaultClassNames.range_end),
        today: cn("pds-calendar-today", defaultClassNames.today),
        outside: cn("pds-calendar-outside", defaultClassNames.outside),
        disabled: cn("pds-calendar-disabled", defaultClassNames.disabled),
        hidden: cn("pds-calendar-hidden", defaultClassNames.hidden),
        ...classNames
      }}
      components={{
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
          <div
            ref={rootRef}
            className={cn(rootClassName)}
            data-slot="calendar"
            {...rootProps}
          />
        ),
        Chevron: ({ className: chevronClassName, orientation, ...iconProps }) => {
          const iconName =
            orientation === "left"
              ? "chevron_left"
              : orientation === "right"
                ? "chevron_right"
                : "keyboard_arrow_down";

          return (
            <Icon
              className={cn("pds-calendar-chevron", chevronClassName)}
              name={iconName}
              {...iconProps}
            />
          );
        },
        DayButton: (dayButtonProps) => (
          <CalendarDayButton
            buttonVariant={buttonVariant}
            locale={locale}
            {...dayButtonProps}
          />
        ),
        WeekNumber: ({ children, ...weekNumberProps }) => (
          <td {...weekNumberProps}>
            <div className="pds-calendar-week-number-value">{children}</div>
          </td>
        ),
        ...components
      }}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}

export interface CalendarDayButtonProps extends DayButtonProps {
  buttonVariant?: ButtonIntent;
  locale?: Partial<Locale>;
}

export const CalendarDayButton = React.forwardRef<
  HTMLButtonElement,
  CalendarDayButtonProps
>(function CalendarDayButton(
  { buttonVariant = "quiet", className, day, locale, modifiers, ...props },
  forwardedRef
) {
  const ref = React.useRef<HTMLButtonElement | null>(null);

  React.useImperativeHandle(forwardedRef, () => ref.current as HTMLButtonElement);

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      className={cn("pds-calendar-day-button", className)}
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-range-end={modifiers.range_end ? true : undefined}
      data-range-middle={modifiers.range_middle ? true : undefined}
      data-range-start={modifiers.range_start ? true : undefined}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
          ? true
          : undefined
      }
      intent={buttonVariant}
      size="icon"
      {...props}
    />
  );
});
