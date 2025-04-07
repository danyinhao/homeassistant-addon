ARG BUILD_FROM
FROM $BUILD_FROM as base

FROM base as dependencies_and_build

WORKDIR /app

COPY docker-entrypoint.sh /
COPY --from=dependencies_and_build /app/node_modules ./node_modules
COPY --from=dependencies_and_build /app/dist ./dist
COPY --from=dependencies_and_build /app/package.json /app/LICENSE /app/index.js ./

ENTRYPOINT [ "/sbin/tini", "--", "/docker-entrypoint.sh"]
# CMD ["node", "dist/index.js"]