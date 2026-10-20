<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { contactSchema, type ContactInput } from '~~/shared/schemas/contact.schema'
import { profile } from '~/data/portfolio'

const copyValue = useCopyToClipboard()
const { submitting, sent, submit } = useContactForm()

const form = useTemplateRef('form')
const state = reactive<Partial<ContactInput>>({ name: '', email: '', message: '' })

const rows = [
  { icon: 'i-lucide-mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, copy: true },
  { icon: 'i-lucide-phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phone}`, copy: true },
  { icon: 'i-lucide-map-pin', label: 'Location', value: profile.location, href: undefined, copy: false },
]

const fieldUi = {
  base: 'rounded-full bg-muted px-4 py-3 ring-default transition-all focus-visible:ring-2 focus-visible:ring-primary/40',
}

async function onSubmit(event: FormSubmitEvent<ContactInput>) {
  try {
    await submit(event.data)
    Object.assign(state, { name: '', email: '', message: '' })
  }
  catch (error) {
    const fieldErrors = getFieldErrors(error)
    if (fieldErrors.length) form.value?.setErrors(fieldErrors)
  }
}
</script>

<template>
  <section
    id="contact"
    class="section-padding"
  >
    <div class="mx-auto max-w-4xl">
      <AppSectionHeading
        eyebrow="05. Contact"
        title="Get in touch"
        description="Have a question or a project in mind? Fill out the form and I'll get back to you as soon as possible."
        align="center"
      />

      <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
        <ul class="space-y-4">
          <AppReveal
            v-for="(row, index) in rows"
            :key="row.label"
            as="li"
            :x="-30"
            :y="0"
            :delay="index * 0.1"
          >
            <div class="group -m-3 flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-colors hover:border-default hover:bg-muted/40">
              <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <UIcon
                  :name="row.icon"
                  class="size-[18px] text-primary"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm text-muted">
                  {{ row.label }}
                </p>
                <a
                  v-if="row.href"
                  :href="row.href"
                  dir="ltr"
                  class="block truncate text-highlighted hover:text-primary"
                >
                  {{ row.value }}
                </a>
                <p
                  v-else
                  class="truncate text-highlighted"
                >
                  {{ row.value }}
                </p>
              </div>
              <button
                v-if="row.copy"
                type="button"
                class="rounded-full p-2 text-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-primary/10 hover:text-primary focus-visible:opacity-100 max-md:opacity-100"
                :aria-label="`Copy ${row.label.toLowerCase()}`"
                @click="copyValue(row.value, row.label)"
              >
                <UIcon
                  name="i-lucide-copy"
                  class="size-4"
                />
              </button>
            </div>
          </AppReveal>
        </ul>

        <AppReveal
          :x="30"
          :y="0"
          :delay="0.15"
        >
          <UForm
            ref="form"
            :schema="contactSchema"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormField
              label="Name"
              name="name"
              :ui="{ label: 'sr-only' }"
            >
              <UInput
                v-model="state.name"
                placeholder="Name"
                autocomplete="name"
                size="xl"
                variant="none"
                class="w-full"
                :ui="fieldUi"
              />
            </UFormField>
            <UFormField
              label="Email"
              name="email"
              :ui="{ label: 'sr-only' }"
            >
              <UInput
                v-model="state.email"
                type="email"
                placeholder="Email"
                autocomplete="email"
                inputmode="email"
                size="xl"
                variant="none"
                class="w-full"
                :ui="fieldUi"
              />
            </UFormField>
            <UFormField
              label="Message"
              name="message"
              :ui="{ label: 'sr-only' }"
            >
              <UTextarea
                v-model="state.message"
                placeholder="Message"
                :rows="5"
                size="xl"
                variant="none"
                class="w-full"
                :ui="{ base: 'resize-none rounded-3xl bg-muted px-4 py-3 ring-default transition-all focus-visible:ring-2 focus-visible:ring-primary/40' }"
              />
            </UFormField>

            <AppMagnetic :strength="0.2">
              <button
                type="submit"
                :disabled="submitting"
                class="bg-gradient-primary inline-flex items-center gap-2 rounded-full px-8 py-3 font-medium text-inverted transition-shadow duration-300 hover:shadow-glow disabled:opacity-70"
              >
                <AnimatePresence
                  mode="wait"
                  :initial="false"
                >
                  <Motion
                    :key="sent ? 'sent' : 'send'"
                    as="span"
                    class="inline-flex items-center gap-2"
                    :initial="{ opacity: 0, y: 8 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :exit="{ opacity: 0, y: -8 }"
                    :transition="{ duration: 0.18 }"
                  >
                    <UIcon
                      :name="sent ? 'i-lucide-check' : submitting ? 'i-lucide-loader-circle' : 'i-lucide-send'"
                      class="size-[18px]"
                      :class="{ 'animate-spin': submitting }"
                    />
                    {{ sent ? 'Message sent' : submitting ? 'Sending…' : 'Send Message' }}
                  </Motion>
                </AnimatePresence>
              </button>
            </AppMagnetic>
          </UForm>
        </AppReveal>
      </div>
    </div>
  </section>
</template>
