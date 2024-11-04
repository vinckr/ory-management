function(ctx) {
    userId: ctx.identity.id,
    traits: {
      email: ctx.identity.traits.email,
      name: ctx.identity.traits.name,
      compliance: ctx.identity.traits.compliance,
    },
  }